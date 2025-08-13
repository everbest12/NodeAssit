'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, ThumbsUp, ThumbsDown, Copy, Loader2, Sparkles, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  rating?: 'up' | 'down'
}

interface FAQData {
  question: string
  answer: string
}

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [faqData, setFaqData] = useState<FAQData[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('nodeAssistChat')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
        setMessages(messagesWithDates)
      } catch (error) {
        console.error('Error loading chat from localStorage:', error)
        // If there's an error loading, start fresh
        const welcomeMessage: Message = {
          id: 'welcome',
          role: 'assistant',
          content: `👋 **Welcome to Node Assist!** 

I'm your advanced AI assistant, here to help you with:
• **Node Setup**: Step-by-step guidance for deploying your nodes
• **Troubleshooting**: Solutions for common errors and issues
• **Best Practices**: Tips and recommendations for optimal performance
• **Technical Questions**: Deep technical knowledge about Web3 and blockchain

Feel free to ask me anything! For example:
- "How do I set up a node?"
- "What are the system requirements?"
- "I'm getting an error with Docker, can you help?"
- "How do I check if my node is working properly?"
- "What's the difference between a trap and an operator?"

What would you like to know? 🤖`,
          timestamp: new Date()
        }
        setMessages([welcomeMessage])
      }
    } else {
      // Set initial welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `👋 **Welcome to Node Assist!** 

I'm your advanced AI assistant, here to help you with:
• **Node Setup**: Step-by-step guidance for deploying your nodes
• **Troubleshooting**: Solutions for common errors and issues
• **Best Practices**: Tips and recommendations for optimal performance
• **Technical Questions**: Deep technical knowledge about Web3 and blockchain

Feel free to ask me anything! For example:
- "How do I set up a node?"
- "What are the system requirements?"
- "I'm getting an error with Docker, can you help?"
- "How do I check if my node is working properly?"
- "What's the difference between a trap and an operator?"

What would you like to know? 🤖`,
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('nodeAssistChat', JSON.stringify(messages))
      } catch (error) {
        console.error('Error saving chat to localStorage:', error)
      }
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Provide intelligent fallback based on user input
      const userInput = userMessage.content.toLowerCase()
      let fallbackResponse = ''
      
      if (userInput.includes('hello') || userInput.includes('hi')) {
        fallbackResponse = "Hello! 👋 I'm your Node Assist AI. I'm here to help you with node setup, troubleshooting, and any Web3 questions you might have. What would you like to know about today?"
      } else if (userInput.includes('help')) {
        fallbackResponse = "I'm here to help! 🚀 I can assist you with:\n\n• **Node Setup**: Complete deployment guides\n• **Troubleshooting**: Fix errors and issues\n• **Web3 Questions**: Blockchain and crypto concepts\n• **Technical Support**: Docker, Foundry, CLI tools\n\nJust ask me anything specific!"
      } else if (userInput.includes('name') || userInput.includes('who are you')) {
        fallbackResponse = "My name is **Node Assist AI**! 🤖 I'm your intelligent assistant specifically designed to help you with node setup, Web3 development, and blockchain technology. I can guide you through deployment processes, troubleshoot issues, and answer your technical questions. What would you like to know about today?"
      } else if (userInput.includes('what can you do') || userInput.includes('capabilities')) {
        fallbackResponse = "I'm **Node Assist AI** and I can help you with a wide range of Web3 and blockchain tasks! 🛠️\n\n**My Capabilities:**\n\n🔧 **Node Setup & Deployment**\n• Step-by-step node installation guides\n• Configuration file setup and optimization\n• Docker container management\n• Network connectivity troubleshooting\n\n⚡ **Technical Support**\n• Docker installation and usage\n• Foundry toolkit setup and commands\n• Smart contract compilation and deployment\n• Error diagnosis and resolution\n\n🌐 **Web3 Education**\n• Blockchain concepts and terminology\n• DeFi and smart contract explanations\n• Security best practices\n• Network architecture understanding\n\n📚 **Documentation & Resources**\n• Official documentation references\n• GitHub repository guidance\n• Community resources and forums\n• Best practice recommendations\n\n**What would you like to work on today?**"
      } else if (userInput.includes('how are you')) {
        fallbackResponse = "I'm functioning perfectly! 🤖 Thanks for asking. I'm ready to help you with any node setup, Web3 development, or blockchain questions you might have. What can I assist you with today?"
      } else if (userInput.includes('node') || userInput.includes('setup') || userInput.includes('deploy')) {
        fallbackResponse = "I can help you with node setup! 🚀 Here's what you need to know:\n\n**Basic Setup Steps:**\n1. Install Docker and Foundry\n2. Clone the repository\n3. Configure your settings\n4. Deploy your node\n\n**System Requirements:**\n- Ubuntu/Linux environment\n- 4+ CPU cores\n- 8GB+ RAM\n- Open ports 31313, 31314\n\nWould you like me to guide you through any specific step?"
      } else if (userInput.includes('error') || userInput.includes('problem') || userInput.includes('issue')) {
        fallbackResponse = "I can help you troubleshoot! 🔧 Common issues include:\n\n**Command Not Found:**\n- Run `source /root/.bashrc`\n- Reinstall dependencies\n- Check PATH environment\n\n**Port Issues:**\n- Ensure ports 31313, 31314 are open\n- Check firewall settings\n- Verify Docker is running\n\n**Configuration Errors:**\n- Validate your config files\n- Check private key format\n- Verify network settings\n\nWhat specific error are you seeing?"
      } else if (userInput.includes('docker') || userInput.includes('container')) {
        fallbackResponse = "Docker is essential for node deployment! 🐳 Here's what you need to know:\n\n**Installation:**\n```bash\ncurl -fsSL https://get.docker.com -o get-docker.sh\nsudo sh get-docker.sh\n```\n\n**Common Commands:**\n- `docker ps` - List running containers\n- `docker logs <container>` - View logs\n- `docker compose up -d` - Start services\n\n**Troubleshooting:**\n- Ensure Docker daemon is running\n- Check container status with `docker ps`\n- Verify port mappings\n\nNeed help with a specific Docker issue?"
      } else if (userInput.includes('foundry') || userInput.includes('forge')) {
        fallbackResponse = "Foundry is a powerful Ethereum development toolkit! ⚒️\n\n**Installation:**\n```bash\ncurl -L https://foundry.paradigm.xyz | bash\nfoundryup\n```\n\n**Key Commands:**\n- `forge build` - Compile contracts\n- `forge test` - Run tests\n- `forge deploy` - Deploy contracts\n\n**Common Issues:**\n- Ensure Rust is installed\n- Check network configuration\n- Verify contract syntax\n\nWhat specific Foundry question do you have?"
      } else if (userInput.includes('web3') || userInput.includes('blockchain') || userInput.includes('crypto')) {
        fallbackResponse = "Web3 and blockchain are fascinating! 🌐 Here's what I can help with:\n\n**Key Concepts:**\n• **Nodes**: Network participants that validate transactions\n• **Smart Contracts**: Self-executing code on blockchain\n• **DeFi**: Decentralized finance applications\n• **Consensus**: How networks agree on valid transactions\n\n**For Node Setup:**\n- I can guide you through deployment\n- Help with configuration\n- Troubleshoot issues\n\nWhat aspect of Web3 interests you most?"
      } else {
        fallbackResponse = `I understand you're asking about "${userMessage.content}". While I'm designed to help with node setup and Web3 technology, I can provide guidance on a wide range of technical topics.

**I can help with:**
• Node deployment and configuration
• Docker, Foundry, and development tools
• Blockchain and Web3 concepts
• Technical troubleshooting
• Security best practices

**For your question:** I'd be happy to help you find relevant information or guide you to the right resources. What specific aspect would you like to explore?`
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleRating = (messageId: string, rating: 'up' | 'down') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    )
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Copied to clipboard!', 'success')
    } catch (error) {
      console.error('Failed to copy text:', error)
      showToast('Failed to copy text', 'error')
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('nodeAssistChat')
    showToast('Chat history cleared', 'success')
  }

  return (
    <div className="flex flex-col h-full max-h-[600px] md:max-h-[700px] bg-gradient-to-br from-web3-dark/90 to-web3-darker/90 backdrop-blur-sm rounded-2xl border border-web3-primary/20 shadow-2xl">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${
                toast.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-web3-primary/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Node Assist AI</h3>
            <p className="text-sm text-gray-400">Advanced node setup assistant</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearChat}
          className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10"
          title="Clear chat history"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-web3-secondary to-web3-purple' 
                      : 'bg-gradient-to-r from-web3-primary to-web3-accent'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-web3-secondary to-web3-purple text-white'
                      : 'bg-web3-dark/60 border border-web3-primary/20 text-gray-100'
                  }`}>
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={tomorrow}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg my-2"
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className="bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                    
                    {/* Message Actions */}
                    {message.role === 'assistant' && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRating(message.id, 'up')}
                            className={`p-1.5 rounded-lg transition-colors ${
                              message.rating === 'up' 
                                ? 'text-green-400 bg-green-400/10' 
                                : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                            }`}
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRating(message.id, 'down')}
                            className={`p-1.5 rounded-lg transition-colors ${
                              message.rating === 'down' 
                                ? 'text-red-400 bg-red-400/10' 
                                : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                            }`}
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(message.content)}
                          className="p-1.5 text-gray-400 hover:text-web3-primary hover:bg-web3-primary/10 rounded-lg transition-colors"
                          title="Copy message"
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`text-xs text-gray-500 mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-web3-primary to-web3-accent rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-web3-dark/60 border border-web3-primary/20 rounded-2xl px-4 py-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 text-web3-primary animate-spin" />
                  <span className="text-gray-300">AI is thinking</span>
                  <div className="loading-dots"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-web3-primary/20">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about node setup..."
              className="web3-input w-full pr-12 resize-none"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">
              Enter to send
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="web3-button disabled:opacity-50 disabled:cursor-not-allowed min-w-[50px] h-[50px] p-0 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        
        {/* Quick Suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {['How do I set up a node?', 'System requirements?', 'Docker issues?', 'Check node status?'].map((suggestion, index) => (
            <motion.button
              key={suggestion}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInput(suggestion)}
              className="text-xs bg-web3-primary/10 hover:bg-web3-primary/20 text-web3-primary px-3 py-1.5 rounded-full border border-web3-primary/20 transition-colors"
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
