import { NextRequest, NextResponse } from 'next/server'
import { WebSocketServer } from 'ws'

// In-memory storage for connected clients and node data
let wss: WebSocketServer | null = null
const clients = new Set<WebSocket>()
const nodeData = new Map<string, any>()

// Initialize WebSocket server
if (!wss) {
  wss = new WebSocketServer({ port: 3002 })
  
  wss.on('connection', (ws) => {
    console.log('Client connected to monitoring')
    clients.add(ws)
    
    // Send current node data to new client
    ws.send(JSON.stringify({
      type: 'initial',
      data: Array.from(nodeData.values())
    }))
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString())
        
        switch (data.type) {
          case 'node_metrics':
            // Update node data
            nodeData.set(data.nodeId, data.metrics)
            
            // Broadcast to all clients
            broadcast({
              type: 'node_update',
              nodeId: data.nodeId,
              metrics: data.metrics
            })
            break
            
          case 'node_status':
            // Update node status
            const existingData = nodeData.get(data.nodeId) || {}
            nodeData.set(data.nodeId, {
              ...existingData,
              status: data.status,
              lastSeen: new Date().toISOString()
            })
            
            broadcast({
              type: 'status_update',
              nodeId: data.nodeId,
              status: data.status
            })
            break
            
          case 'alert':
            // Handle new alerts
            broadcast({
              type: 'alert',
              nodeId: data.nodeId,
              alert: data.alert
            })
            break
        }
      } catch (error) {
        console.error('Error processing message:', error)
      }
    })
    
    ws.on('close', () => {
      console.log('Client disconnected from monitoring')
      clients.delete(ws)
    })
    
    ws.on('error', (error) => {
      console.error('WebSocket error:', error)
      clients.delete(ws)
    })
  })
  
  console.log('WebSocket server started on port 3002')
}

function broadcast(data: any) {
  const message = JSON.stringify(data)
  clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(message)
    }
  })
}

// HTTP endpoints for non-WebSocket clients
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const nodeId = searchParams.get('nodeId')
  
  if (nodeId) {
    const nodeMetrics = nodeData.get(nodeId)
    if (nodeMetrics) {
      return NextResponse.json({ success: true, data: nodeMetrics })
    } else {
      return NextResponse.json({ success: false, error: 'Node not found' }, { status: 404 })
    }
  }
  
  // Return all node data
  return NextResponse.json({
    success: true,
    data: Array.from(nodeData.values())
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    switch (body.type) {
      case 'node_metrics':
        nodeData.set(body.nodeId, body.metrics)
        broadcast({
          type: 'node_update',
          nodeId: body.nodeId,
          metrics: body.metrics
        })
        break
        
      case 'node_status':
        const existingData = nodeData.get(body.nodeId) || {}
        nodeData.set(body.nodeId, {
          ...existingData,
          status: body.status,
          lastSeen: new Date().toISOString()
        })
        
        broadcast({
          type: 'status_update',
          nodeId: body.nodeId,
          status: body.status
        })
        break
        
      case 'alert':
        broadcast({
          type: 'alert',
          nodeId: body.nodeId,
          alert: body.alert
        })
        break
        
      default:
        return NextResponse.json({ success: false, error: 'Invalid message type' }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing POST request:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
