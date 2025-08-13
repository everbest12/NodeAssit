#!/usr/bin/env node

const os = require('os')
const fs = require('fs')
const path = require('path')
const WebSocket = require('ws')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

class NodeMonitor {
  constructor(config = {}) {
    this.config = {
      nodeId: config.nodeId || `node-${Date.now()}`,
      nodeName: config.nodeName || 'Drosera Node',
      serverUrl: config.serverUrl || 'ws://localhost:3002',
      interval: config.interval || 5000, // 5 seconds
      ...config
    }
    
    this.ws = null
    this.isConnected = false
    this.metrics = {}
    this.alerts = []
    this.uptime = Date.now()
  }

  async connect() {
    try {
      this.ws = new WebSocket(this.config.serverUrl)
      
      this.ws.on('open', () => {
        console.log('Connected to monitoring server')
        this.isConnected = true
        this.sendStatus('online')
      })
      
      this.ws.on('message', (data) => {
        try {
          const message = JSON.parse(data)
          this.handleMessage(message)
        } catch (error) {
          console.error('Error parsing message:', error)
        }
      })
      
      this.ws.on('close', () => {
        console.log('Disconnected from monitoring server')
        this.isConnected = false
        this.sendStatus('offline')
      })
      
      this.ws.on('error', (error) => {
        console.error('WebSocket error:', error)
        this.isConnected = false
      })
      
    } catch (error) {
      console.error('Failed to connect to monitoring server:', error)
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'ping':
        this.send({ type: 'pong', timestamp: Date.now() })
        break
      case 'request_metrics':
        this.collectAndSendMetrics()
        break
      default:
        console.log('Unknown message type:', message.type)
    }
  }

  send(data) {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify(data))
    }
  }

  async collectMetrics() {
    try {
      const metrics = {
        id: this.config.nodeId,
        name: this.config.nodeName,
        timestamp: Date.now(),
        uptime: Date.now() - this.uptime,
        
        // System metrics
        cpu: await this.getCpuUsage(),
        memory: this.getMemoryUsage(),
        disk: await this.getDiskUsage(),
        network: await this.getNetworkUsage(),
        
        // Process metrics
        processes: await this.getProcessInfo(),
        
        // Docker metrics (if available)
        docker: await this.getDockerMetrics(),
        
        // Custom metrics
        custom: await this.getCustomMetrics()
      }
      
      return metrics
    } catch (error) {
      console.error('Error collecting metrics:', error)
      return null
    }
  }

  async getCpuUsage() {
    try {
      const cpus = os.cpus()
      const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0)
      const totalTick = cpus.reduce((acc, cpu) => 
        acc + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle + cpu.times.irq, 0
      )
      
      return Math.round((1 - totalIdle / totalTick) * 100)
    } catch (error) {
      console.error('Error getting CPU usage:', error)
      return 0
    }
  }

  getMemoryUsage() {
    try {
      const totalMem = os.totalmem()
      const freeMem = os.freemem()
      const usedMem = totalMem - freeMem
      
      return {
        total: totalMem,
        used: usedMem,
        free: freeMem,
        percentage: Math.round((usedMem / totalMem) * 100)
      }
    } catch (error) {
      console.error('Error getting memory usage:', error)
      return { total: 0, used: 0, free: 0, percentage: 0 }
    }
  }

  async getDiskUsage() {
    try {
      const { stdout } = await execAsync('df -h / | tail -1')
      const parts = stdout.trim().split(/\s+/)
      const usedPercentage = parseInt(parts[4].replace('%', ''))
      
      return {
        total: parts[1],
        used: parts[2],
        available: parts[3],
        percentage: usedPercentage
      }
    } catch (error) {
      console.error('Error getting disk usage:', error)
      return { total: '0', used: '0', available: '0', percentage: 0 }
    }
  }

  async getNetworkUsage() {
    try {
      const { stdout } = await execAsync('cat /proc/net/dev | grep eth0')
      const parts = stdout.trim().split(/\s+/)
      
      return {
        upload: parseInt(parts[9]) || 0,
        download: parseInt(parts[1]) || 0
      }
    } catch (error) {
      console.error('Error getting network usage:', error)
      return { upload: 0, download: 0 }
    }
  }

  async getProcessInfo() {
    try {
      const { stdout } = await execAsync('ps aux | wc -l')
      const processCount = parseInt(stdout.trim()) - 1 // Subtract header
      
      return {
        count: processCount,
        loadAverage: os.loadavg()
      }
    } catch (error) {
      console.error('Error getting process info:', error)
      return { count: 0, loadAverage: [0, 0, 0] }
    }
  }

  async getDockerMetrics() {
    try {
      const { stdout } = await execAsync('docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"')
      const containers = stdout.trim().split('\n').slice(1).map(line => {
        const [name, status, ports] = line.split('\t')
        return { name, status, ports }
      })
      
      return {
        containers,
        count: containers.length
      }
    } catch (error) {
      console.error('Error getting Docker metrics:', error)
      return { containers: [], count: 0 }
    }
  }

  async getCustomMetrics() {
    // Add custom metrics specific to your node
    try {
      // Check if Drosera processes are running
      const { stdout } = await execAsync('ps aux | grep drosera | grep -v grep | wc -l')
      const droseraProcesses = parseInt(stdout.trim())
      
      // Check if required ports are open
      const ports = [31313, 31314]
      const portStatus = {}
      
      for (const port of ports) {
        try {
          await execAsync(`netstat -tuln | grep :${port}`)
          portStatus[port] = 'open'
        } catch {
          portStatus[port] = 'closed'
        }
      }
      
      return {
        droseraProcesses,
        portStatus,
        nodeType: 'drosera',
        version: '1.0.0'
      }
    } catch (error) {
      console.error('Error getting custom metrics:', error)
      return {}
    }
  }

  async collectAndSendMetrics() {
    const metrics = await this.collectMetrics()
    if (metrics) {
      this.metrics = metrics
      this.send({
        type: 'node_metrics',
        nodeId: this.config.nodeId,
        metrics
      })
      
      // Check for alerts
      this.checkAlerts(metrics)
    }
  }

  checkAlerts(metrics) {
    const newAlerts = []
    
    // CPU alert
    if (metrics.cpu > 80) {
      newAlerts.push({
        type: 'warning',
        message: `High CPU usage: ${metrics.cpu}%`,
        severity: metrics.cpu > 90 ? 'high' : 'medium'
      })
    }
    
    // Memory alert
    if (metrics.memory.percentage > 80) {
      newAlerts.push({
        type: 'warning',
        message: `High memory usage: ${metrics.memory.percentage}%`,
        severity: metrics.memory.percentage > 90 ? 'high' : 'medium'
      })
    }
    
    // Disk alert
    if (metrics.disk.percentage > 80) {
      newAlerts.push({
        type: 'warning',
        message: `High disk usage: ${metrics.disk.percentage}%`,
        severity: metrics.disk.percentage > 90 ? 'high' : 'medium'
      })
    }
    
    // Process alert
    if (metrics.processes.count > 1000) {
      newAlerts.push({
        type: 'warning',
        message: `High process count: ${metrics.processes.count}`,
        severity: 'medium'
      })
    }
    
    // Send new alerts
    newAlerts.forEach(alert => {
      this.send({
        type: 'alert',
        nodeId: this.config.nodeId,
        alert: {
          ...alert,
          timestamp: Date.now(),
          id: `alert-${Date.now()}-${Math.random()}`
        }
      })
    })
  }

  sendStatus(status) {
    this.send({
      type: 'node_status',
      nodeId: this.config.nodeId,
      status
    })
  }

  start() {
    console.log(`Starting Node Monitor for ${this.config.nodeName} (${this.config.nodeId})`)
    
    // Connect to monitoring server
    this.connect()
    
    // Start metrics collection
    setInterval(() => {
      this.collectAndSendMetrics()
    }, this.config.interval)
    
    // Send heartbeat
    setInterval(() => {
      if (this.isConnected) {
        this.send({ type: 'heartbeat', timestamp: Date.now() })
      }
    }, 30000) // 30 seconds
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down Node Monitor...')
      this.sendStatus('offline')
      if (this.ws) {
        this.ws.close()
      }
      process.exit(0)
    })
    
    process.on('SIGTERM', () => {
      console.log('Shutting down Node Monitor...')
      this.sendStatus('offline')
      if (this.ws) {
        this.ws.close()
      }
      process.exit(0)
    })
  }
}

// CLI interface
if (require.main === module) {
  const config = {
    nodeId: process.env.NODE_ID || `node-${Date.now()}`,
    nodeName: process.env.NODE_NAME || 'Drosera Node',
    serverUrl: process.env.MONITORING_SERVER || 'ws://localhost:3002',
    interval: parseInt(process.env.METRICS_INTERVAL) || 5000
  }
  
  const monitor = new NodeMonitor(config)
  monitor.start()
}

module.exports = NodeMonitor
