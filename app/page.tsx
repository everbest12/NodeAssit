'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Wand2, Github, MessageCircle, Zap, Shield, Users, ArrowRight, ArrowLeft, Menu, X } from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import SetupWizard from '@/components/SetupWizard'

export default function Home() {
  const [activeSection, setActiveSection] = useState<'chat' | 'wizard'>('chat')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-web3-primary/10 to-web3-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-40 right-10 md:right-20 w-24 h-24 md:w-40 md:h-40 bg-gradient-to-r from-web3-accent/10 to-web3-purple/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-1/4 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-web3-cyan/10 to-web3-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-50">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-xl flex items-center justify-center shadow-lg"
              >
                <Zap className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
                  Node Assist
                </h1>
                <p className="text-xs md:text-sm text-gray-400">AI-Powered Node Setup Assistant</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-web3-primary transition-colors duration-300 group"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>GitHub</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://drosera.notion.site/Dev-FAQs-1d82748eb1a1809487efd7be7604d16f" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-web3-primary transition-colors duration-300 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>FAQ</span>
              </motion.a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-web3-primary transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 bg-web3-dark/50 backdrop-blur-sm rounded-lg border border-web3-primary/20"
              >
                <div className="p-4 space-y-3">
                  <a 
                    href="https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-web3-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://drosera.notion.site/Dev-FAQs-1d82748eb1a1809487efd7be7604d16f" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-web3-primary transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>FAQ</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-8 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-web3-primary via-web3-secondary to-web3-accent bg-clip-text text-transparent glow-text">
                Node Assist
              </span>
              <br />
              <span className="text-white">AI Assistant</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Your intelligent companion for seamless node deployment. Get instant help with setup, troubleshooting, and optimization through our AI-powered assistant.
            </p>
            
            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="web3-card p-4 md:p-6 cursor-pointer"
                onClick={() => setActiveSection('chat')}
              >
                <Bot className="w-8 h-8 md:w-12 md:h-12 text-web3-primary mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">AI Chatbot</h3>
                <p className="text-sm md:text-base text-gray-400">Get instant answers and personalized guidance for your node setup journey</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="web3-card p-4 md:p-6 cursor-pointer"
                onClick={() => setActiveSection('wizard')}
              >
                <Wand2 className="w-8 h-8 md:w-12 md:h-12 text-web3-secondary mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Setup Wizard</h3>
                <p className="text-sm md:text-base text-gray-400">Step-by-step interactive guide for deploying your nodes with confidence</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="web3-card p-4 md:p-6"
              >
                <Shield className="w-8 h-8 md:w-12 md:h-12 text-web3-accent mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Smart Support</h3>
                <p className="text-sm md:text-base text-gray-400">Advanced troubleshooting and real-time problem resolution</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative z-40">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <div className="bg-web3-dark/50 backdrop-blur-sm rounded-2xl p-2 border border-web3-primary/20 w-full max-w-md">
              <div className="flex space-x-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('chat')}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 flex-1 ${
                    activeSection === 'chat'
                      ? 'bg-gradient-to-r from-web3-primary to-web3-secondary text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-web3-primary/10'
                  }`}
                >
                  <Bot className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">AI Chat</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('wizard')}
                  className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 flex-1 ${
                    activeSection === 'wizard'
                      ? 'bg-gradient-to-r from-web3-primary to-web3-secondary text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-web3-primary/10'
                  }`}
                >
                  <Wand2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Setup Wizard</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-30 pb-8 md:pb-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: activeSection === 'chat' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeSection === 'chat' ? 50 : -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {activeSection === 'chat' ? (
                <div className="max-w-4xl mx-auto">
                  <ChatBot />
                </div>
              ) : (
                <div className="max-w-6xl mx-auto">
                  <SetupWizard />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-web3-primary/20 bg-web3-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center space-x-2 mb-3 md:mb-4"
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-web3-primary" />
              <span className="text-white font-medium text-sm md:text-base">Node Assist</span>
            </motion.div>
            <p className="text-gray-400 text-xs md:text-sm">
              Powered by AI • Built for the Web3 Community
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
