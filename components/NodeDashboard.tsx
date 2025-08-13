'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  Cpu, 
  Memory, 
  HardDrive, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Server, 
  Zap,
  TrendingUp,
  TrendingDown,
  Circle,
  RefreshCw,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react'

interface NodeMetrics {
  id: string
  name: string
  status: 'online' | 'offline' | 'warning'
  cpu: number
  memory: number
  disk: number
  network: {
    upload: number
    download: number
  }
  uptime: number
  lastSeen: Date
  alerts: Alert[]
}

interface Alert {
  id: string
  type: 'error' | 'warning' | 'info'
  message: string
  timestamp: Date
  severity: 'low' | 'medium' | 'high'
}

interface LogEntry {
  id: string
  timestamp: Date
  level: 'info' | 'warning' | 'error' | 'debug'
  message: string
  source: string
}

export default function NodeDashboard() {
  const [nodes, setNodes] = useState<NodeMetrics[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [showOfflineNodes, setShowOfflineNodes] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockNodes: NodeMetrics[] = [
      {
        id: 'node-1',
        name: 'Drosera Node #1',
        status: 'online',
        cpu: 45,
        memory: 67,
        disk: 23,
        network: { upload: 1.2, download: 3.4 },
        uptime: 86400, // 24 hours in seconds
        lastSeen: new Date(),
        alerts: [
          {
            id: 'alert-1',
            type: 'warning',
            message: 'High memory usage detected',
            timestamp: new Date(Date.now() - 300000),
            severity: 'medium'
          }
        ]
      },
      {
        id: 'node-2',
        name: 'Drosera Node #2',
        status: 'online',
        cpu: 23,
        memory: 34,
        disk: 12,
        network: { upload: 0.8, download: 2.1 },
        uptime: 172800, // 48 hours
        lastSeen: new Date(),
        alerts: []
      },
      {
        id: 'node-3',
        name: 'Drosera Node #3',
        status: 'warning',
        cpu: 89,
        memory: 92,
        disk: 78,
        network: { upload: 5.6, download: 8.9 },
        uptime: 43200, // 12 hours
        lastSeen: new Date(Date.now() - 60000),
        alerts: [
          {
            id: 'alert-2',
            type: 'error',
            message: 'Critical CPU usage: 89%',
            timestamp: new Date(Date.now() - 120000),
            severity: 'high'
          }
        ]
      }
    ]

    setNodes(mockNodes)
    setIsConnected(true)

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (autoRefresh) {
        setNodes(prevNodes => 
          prevNodes.map(node => ({
            ...node,
            cpu: Math.max(0, Math.min(100, node.cpu + (Math.random() - 0.5) * 10)),
            memory: Math.max(0, Math.min(100, node.memory + (Math.random() - 0.5) * 5)),
            lastSeen: new Date()
          }))
        )
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500'
      case 'warning': return 'text-yellow-500'
      case 'offline': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'offline': return <Circle className="w-4 h-4" />
      default: return <Circle className="w-4 h-4" />
    }
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredNodes = showOfflineNodes 
    ? nodes 
    : nodes.filter(node => node.status !== 'offline')

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="web3-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Node Dashboard</h1>
            <p className="text-web3-secondary">Real-time monitoring of your deployed nodes</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-web3-secondary">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                autoRefresh 
                  ? 'bg-web3-primary text-white' 
                  : 'bg-web3-darker text-web3-secondary hover:text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto Refresh</span>
            </button>
            <button
              onClick={() => setShowOfflineNodes(!showOfflineNodes)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-web3-darker text-web3-secondary hover:text-white transition-colors"
            >
              {showOfflineNodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>Show Offline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <motion.div 
          className="web3-card p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-web3-secondary text-sm">Total Nodes</p>
              <p className="text-2xl font-bold text-white">{nodes.length}</p>
            </div>
            <Server className="w-8 h-8 text-web3-primary" />
          </div>
        </motion.div>

        <motion.div 
          className="web3-card p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-web3-secondary text-sm">Online Nodes</p>
              <p className="text-2xl font-bold text-green-500">
                {nodes.filter(n => n.status === 'online').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div 
          className="web3-card p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-web3-secondary text-sm">Active Alerts</p>
              <p className="text-2xl font-bold text-yellow-500">
                {nodes.reduce((acc, node) => acc + node.alerts.length, 0)}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </motion.div>

        <motion.div 
          className="web3-card p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-web3-secondary text-sm">Avg CPU</p>
              <p className="text-2xl font-bold text-blue-500">
                {Math.round(nodes.reduce((acc, node) => acc + node.cpu, 0) / nodes.length)}%
              </p>
            </div>
            <Cpu className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>
      </div>

      {/* Node Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredNodes.map((node) => (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="web3-card p-6 cursor-pointer hover:bg-web3-darker/50 transition-colors"
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              {/* Node Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(node.status)} bg-web3-darker`}>
                    {getStatusIcon(node.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{node.name}</h3>
                    <p className="text-sm text-web3-secondary">
                      Uptime: {formatUptime(node.uptime)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-web3-secondary">Last seen</p>
                  <p className="text-xs text-white">
                    {node.lastSeen.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                {/* CPU */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-web3-secondary">CPU</span>
                    <span className="text-sm text-white">{node.cpu.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-web3-darker rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        node.cpu > 80 ? 'bg-red-500' : node.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${node.cpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* Memory */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-web3-secondary">Memory</span>
                    <span className="text-sm text-white">{node.memory.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-web3-darker rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        node.memory > 80 ? 'bg-red-500' : node.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${node.memory}%` }}
                    ></div>
                  </div>
                </div>

                {/* Disk */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-web3-secondary">Disk</span>
                    <span className="text-sm text-white">{node.disk.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-web3-darker rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        node.disk > 80 ? 'bg-red-500' : node.disk > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${node.disk}%` }}
                    ></div>
                  </div>
                </div>

                {/* Network */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-web3-secondary">↑ {formatBytes(node.network.upload * 1024 * 1024)}/s</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingDown className="w-3 h-3 text-blue-500" />
                    <span className="text-web3-secondary">↓ {formatBytes(node.network.download * 1024 * 1024)}/s</span>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {node.alerts.length > 0 && (
                <div className="mt-4 pt-4 border-t border-web3-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-white">Alerts ({node.alerts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {node.alerts.slice(0, 2).map((alert) => (
                      <div key={alert.id} className="text-xs text-web3-secondary bg-web3-darker p-2 rounded">
                        {alert.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Node Details Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="web3-card p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Node Details</h2>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-web3-secondary hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                  {/* Add detailed charts and metrics here */}
                  <div className="space-y-4">
                    <div className="bg-web3-darker p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-2">CPU Usage Over Time</h4>
                      <div className="h-32 bg-web3-primary/10 rounded flex items-end justify-between p-2">
                        {Array.from({ length: 24 }, (_, i) => (
                          <div
                            key={i}
                            className="bg-web3-primary rounded-t"
                            style={{ 
                              height: `${Math.random() * 100}%`,
                              width: '3px'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Logs</h3>
                  <div className="bg-web3-darker p-4 rounded-lg h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="text-xs font-mono">
                          <span className="text-web3-secondary">[{new Date(Date.now() - i * 60000).toLocaleTimeString()}]</span>
                          <span className="text-green-500"> INFO</span>
                          <span className="text-white">: Node operation completed successfully</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
