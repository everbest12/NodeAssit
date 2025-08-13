'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Wand2, Github, MessageCircle, Zap, Shield, Users, ArrowRight, ArrowLeft, Menu, X, Server } from 'lucide-react'
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
        <div className="container mx-auto px-4 py-3 md:py-6">
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
                className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg md:rounded-xl flex items-center justify-center shadow-lg"
              >
                <Zap className="w-4 h-4 md:w-7 md:h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-base md:text-2xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
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
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-3 bg-web3-dark/50 backdrop-blur-sm rounded-lg border border-web3-primary/20"
              >
                <div className="p-3 space-y-2">
                  <a 
                    href="https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-web3-primary transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href="https://drosera.notion.site/Dev-FAQs-1d82748eb1a1809487efd7be7604d16f" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-web3-primary transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>FAQ</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Section with Enhanced Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-web3-darker via-web3-dark to-web3-primary/20">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-20 left-4 md:left-20 w-3 h-3 md:w-4 md:h-4 bg-web3-primary/30 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              x: [0, -15, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-40 right-4 md:right-32 w-4 h-4 md:w-6 md:h-6 bg-web3-accent/40 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, -25, 0],
              x: [0, 20, 0],
              rotate: [0, -180, -360]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-40 left-1/4 w-2 h-2 md:w-3 md:h-3 bg-web3-secondary/50 rounded-full blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              x: [0, -25, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-20 right-1/3 w-3 h-3 md:w-5 md:h-5 bg-web3-purple/35 rounded-full blur-sm"
          />
        </div>

        {/* Main Banner Content */}
        <div className="relative z-10 text-center px-2 md:px-4 max-w-4xl mx-auto">
          {/* Glowing Logo/Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 md:mb-8"
          >
            <div className="relative inline-block">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-web3-primary via-web3-accent to-web3-secondary rounded-xl md:rounded-2xl flex items-center justify-center shadow-2xl shadow-web3-primary/30">
                <Server className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-web3-primary/20 via-web3-accent/20 to-web3-secondary/20 rounded-2xl md:rounded-3xl blur-xl animate-pulse"></div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6"
          >
            <span className="bg-gradient-to-r from-web3-primary via-web3-accent to-web3-secondary bg-clip-text text-transparent">
              Node Assist
            </span>
          </motion.h1>

          {/* Simple Subtitle */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 px-2"
          >
            AI-Powered Node Setup
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection('chat')}
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-web3-primary to-web3-accent rounded-xl font-semibold text-white shadow-2xl shadow-web3-primary/30 hover:shadow-web3-primary/50 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Start Chatting</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-web3-accent to-web3-secondary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSection('wizard')}
              className="group relative w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-web3-primary/50 rounded-xl font-semibold text-white hover:border-web3-primary hover:bg-web3-primary/10 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <Wand2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Setup Wizard</span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 md:w-6 md:h-10 border-2 border-web3-primary/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 md:h-3 bg-web3-primary rounded-full mt-1 md:mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Navigation Tabs */}
      <section className="relative z-40">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-4 md:mb-8"
          >
            <div className="bg-web3-dark/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 md:p-2 border border-web3-primary/20 w-full max-w-sm md:max-w-md">
              <div className="flex space-x-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('chat')}
                  className={`flex items-center justify-center space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex-1 text-sm md:text-base ${
                    activeSection === 'chat'
                      ? 'bg-gradient-to-r from-web3-primary to-web3-secondary text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-web3-primary/10'
                  }`}
                >
                  <Bot className="w-4 h-4 md:w-5 md:h-5" />
                  <span>AI Chat</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveSection('wizard')}
                  className={`flex items-center justify-center space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 flex-1 text-sm md:text-base ${
                    activeSection === 'wizard'
                      ? 'bg-gradient-to-r from-web3-primary to-web3-secondary text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-web3-primary/10'
                  }`}
                >
                  <Wand2 className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Setup Wizard</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-30 pb-6 md:pb-16">
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
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center space-x-2 mb-2 md:mb-4"
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
