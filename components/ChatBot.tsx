'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Send, ThumbsUp, ThumbsDown, Copy, Check, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  rating?: 'up' | 'down' | null
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
  const [toasts, setToasts] = useState<Toast[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory')
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        setMessages(parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })))
      } catch (error) {
        console.error('Error loading chat history:', error)
      }
    } else {
      // Welcome message for new users
      setMessages([{
        id: 'welcome',
        role: 'assistant',
        content: "Hello! 👋 I'm **Node Assist AI**, your advanced assistant for Web3 and blockchain node deployment. I can help you with setup, troubleshooting, and all things Web3. What would you like to work on today?",
        timestamp: new Date(),
        rating: undefined
      }])
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages))
    }
  }, [messages])

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Copied to clipboard!', 'success')
    } catch (error) {
      showToast('Failed to copy', 'error')
    }
  }

  const handleRating = (messageId: string, rating: 'up' | 'down') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ))
    showToast(`Thank you for your feedback!`, 'success')
  }

  const clearChat = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: "Hello! 👋 I'm **Node Assist AI**, your advanced assistant for Web3 and blockchain node deployment. I can help you with setup, troubleshooting, and all things Web3. What would you like to work on today?",
      timestamp: new Date(),
      rating: undefined
    }])
    localStorage.removeItem('chatHistory')
    showToast('Chat history cleared', 'success')
  }

  const handleSendMessage = async (suggestion?: string) => {
    const messageToSend = suggestion || input.trim()
    if (!messageToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
      rating: undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: messageToSend,
          conversationHistory
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
        timestamp: new Date(),
        rating: undefined
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or check your internet connection.",
        timestamp: new Date(),
        rating: undefined
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickSuggestions = [
    'How do I set up a node?',
    'System requirements?',
    'Docker issues?',
    'Check node status?',
    'Troubleshoot deployment',
    'Monitor performance'
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-3 rounded-lg shadow-lg text-sm md:text-base ${
                toast.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              <Check className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="web3-card p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-white">AI Assistant</h2>
              <p className="text-xs md:text-sm text-gray-400">Ask me anything about node setup</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="px-3 md:px-4 py-1.5 md:py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-xs md:text-sm font-medium transition-colors"
          >
            Clear Chat
          </motion.button>
        </div>

        {/* Quick Suggestions */}
        <div className="mb-4 md:mb-6">
          <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(suggestion)}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-web3-primary/20 hover:bg-web3-primary/30 text-web3-primary rounded-lg text-xs md:text-sm font-medium transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          ref={messagesContainerRef}
          className="space-y-4 mb-4 md:mb-6 max-h-96 md:max-h-[500px] overflow-y-auto scroll-smooth"
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] md:max-w-[75%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-2 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-web3-primary to-web3-secondary' 
                        : 'bg-gradient-to-r from-web3-accent to-web3-purple'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`rounded-2xl px-3 md:px-4 py-2 md:py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-web3-secondary to-web3-purple text-white'
                        : 'bg-web3-dark/60 border border-web3-primary/20 text-gray-100'
                    }`}>
                      <div className="prose prose-invert max-w-none text-sm md:text-base">
                        <ReactMarkdown
                          components={{
                            code: ({ className, children, ...props }: any) => {
                              const match = /language-(\w+)/.exec(className || '')
                              const isInline = !match
                              return !isInline ? (
                                <SyntaxHighlighter
                                  style={tomorrow}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-lg my-2 text-xs md:text-sm"
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code className="bg-gray-800 px-1 py-0.5 rounded text-xs md:text-sm">
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
                        <div className="flex items-center justify-between mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-700/50">
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRating(message.id, 'up')}
                              className={`p-1 md:p-1.5 rounded-lg transition-colors ${
                                message.rating === 'up' 
                                  ? 'text-green-400 bg-green-400/10' 
                                  : 'text-gray-400 hover:text-green-400 hover:bg-green-400/10'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRating(message.id, 'down')}
                              className={`p-1 md:p-1.5 rounded-lg transition-colors ${
                                message.rating === 'down' 
                                  ? 'text-red-400 bg-red-400/10' 
                                  : 'text-gray-400 hover:text-red-400 hover:bg-red-400/10'
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3 md:w-4 md:h-4" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(message.content)}
                            className="p-1 md:p-1.5 text-gray-400 hover:text-web3-primary hover:bg-web3-primary/10 rounded-lg transition-colors"
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3 md:w-4 md:h-4" />
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`text-xs text-gray-500 mt-1 md:mt-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-web3-primary to-web3-accent rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div className="bg-web3-dark/60 border border-web3-primary/20 rounded-2xl px-3 md:px-4 py-2 md:py-3">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-web3-primary animate-spin" />
                  <span className="text-gray-300 text-sm md:text-base">AI is thinking</span>
                  <div className="loading-dots"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-2 md:space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about node setup, troubleshooting, or anything Web3..."
              className="w-full px-3 md:px-4 py-2 md:py-3 bg-web3-dark/50 border border-web3-primary/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-web3-primary/50 focus:border-transparent transition-all duration-300 text-sm md:text-base"
              disabled={isLoading}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-web3-primary to-web3-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-web3-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </form>
      </div>
    </div>
  )
}
