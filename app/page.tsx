'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bot, 
  Wand2, 
  MessageSquare, 
  Code, 
  Server, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Play,
  Github,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Rocket,
  Cpu,
  Globe,
  Lock,
  BarChart3,
  Clock,
  Sparkles
} from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import SetupWizard from '@/components/SetupWizard'

export default function Home() {
  const [activeSection, setActiveSection] = useState<'chat' | 'wizard'>('chat')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Assistant",
      description: "Advanced chatbot with RAG technology for intelligent node setup guidance",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: "Setup Wizard",
      description: "Step-by-step interactive guide for seamless node deployment",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security First",
      description: "Enterprise-grade security with encrypted communications",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Optimized performance for quick setup and deployment",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Built with feedback from thousands of node operators",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web3 Native",
      description: "Designed specifically for blockchain and Web3 ecosystems",
      color: "from-red-500 to-pink-500"
    }
  ]

  const stats = [
    { number: "10K+", label: "Nodes Deployed", icon: <Server className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Clock className="w-6 h-6" /> },
    { number: "50K+", label: "Queries Answered", icon: <MessageSquare className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Users className="w-6 h-6" /> }
  ]

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Senior DevOps Engineer",
      company: "DeFi Protocol",
      content: "Node Assist revolutionized our node deployment process. What used to take days now takes minutes.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Sarah Johnson",
      role: "Blockchain Developer",
      company: "Web3 Startup",
      content: "The AI assistant is incredibly intelligent. It understands complex technical issues and provides accurate solutions.",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      name: "Mike Rodriguez",
      role: "Node Operator",
      company: "Independent",
      content: "The setup wizard is a game-changer. Even with minimal technical background, I was able to deploy my node successfully.",
      rating: 5,
      avatar: "👨‍🔧"
    }
  ]

  const benefits = [
    "Reduce setup time by 90%",
    "Eliminate common configuration errors",
    "Get instant technical support",
    "Access to expert knowledge base",
    "Real-time troubleshooting",
    "Community-driven solutions"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-web3-darker via-web3-dark to-web3-darker">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-web3-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-web3-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-web3-secondary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-web3-primary to-web3-accent rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Node Assist
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Node Setup</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Features
              </motion.a>
              <motion.a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Testimonials
              </motion.a>
              <motion.a
                href="https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </motion.a>
              <motion.button
                onClick={() => setActiveSection('chat')}
                className="bg-gradient-to-r from-web3-primary to-web3-accent text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 bg-web3-dark/80 backdrop-blur-sm rounded-lg p-4 space-y-4"
              >
                <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
                <a href="#testimonials" className="block text-gray-300 hover:text-white">Testimonials</a>
                <a href="https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <button
                  onClick={() => {
                    setActiveSection('chat')
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-web3-primary to-web3-accent text-white px-6 py-2 rounded-lg"
                >
                  Get Started
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Deploy Nodes
              </span>
              <br />
              <span className="bg-gradient-to-r from-web3-primary via-web3-accent to-web3-secondary bg-clip-text text-transparent">
                Like a Pro
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The ultimate AI-powered assistant for Web3 node deployment. 
              <span className="text-web3-primary font-semibold"> 90% faster setup</span>, 
              <span className="text-web3-accent font-semibold"> zero configuration errors</span>, 
              and <span className="text-web3-secondary font-semibold">24/7 expert support</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          >
            <motion.button
              onClick={() => setActiveSection('chat')}
              className="bg-gradient-to-r from-web3-primary to-web3-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              <span>Start with AI Assistant</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={() => setActiveSection('wizard')}
              className="border-2 border-web3-primary/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:border-web3-primary hover:bg-web3-primary/10 transition-all duration-300 flex items-center space-x-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Setup Wizard</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2 text-web3-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-web3-primary to-web3-accent bg-clip-text text-transparent">Node Assist</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built by node operators, for node operators. Experience the future of Web3 deployment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl blur-xl"
                   style={{ background: `linear-gradient(to right, var(--${feature.color.split('-')[1]}-500), var(--${feature.color.split('-')[3]}-500))` }}></div>
              <div className="relative bg-web3-dark/60 backdrop-blur-sm border border-web3-primary/20 rounded-2xl p-8 hover:border-web3-primary/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Transform Your <span className="bg-gradient-to-r from-web3-primary to-web3-accent bg-clip-text text-transparent">Node Experience</span>
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-web3-primary to-web3-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-web3-primary/20 to-web3-accent/20 rounded-2xl p-8 border border-web3-primary/30">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-mono text-sm">Node Status: Active</span>
                </div>
                <div className="bg-web3-darker rounded-lg p-4">
                  <div className="text-green-400 font-mono text-sm">
                    <div>✅ Trap deployed successfully</div>
                    <div>✅ Operator connected</div>
                    <div>✅ Network sync complete</div>
                    <div>✅ Rewards accumulating</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Uptime: 99.9%</span>
                  <span>Rewards: +2.5 ETH</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-web3-primary to-web3-accent bg-clip-text text-transparent">Node Operators</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of successful node operators who've transformed their deployment experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-web3-dark/60 backdrop-blur-sm border border-web3-primary/20 rounded-2xl p-8 hover:border-web3-primary/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-web3-primary text-sm">{testimonial.company}</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-web3-primary/20 to-web3-accent/20 rounded-3xl p-12 border border-web3-primary/30">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Deploy Your <span className="bg-gradient-to-r from-web3-primary to-web3-accent bg-clip-text text-transparent">First Node</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the future of Web3 infrastructure. Deploy your node in minutes, not days.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                onClick={() => setActiveSection('chat')}
                className="bg-gradient-to-r from-web3-primary to-web3-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                <span>Start Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.a
                href="https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Github className="w-5 h-5" />
                <span>View Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-web3-dark/60 backdrop-blur-sm border border-web3-primary/20 rounded-xl p-2">
            <div className="flex space-x-2">
              <motion.button
                onClick={() => setActiveSection('chat')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeSection === 'chat'
                    ? 'bg-gradient-to-r from-web3-primary to-web3-accent text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-web3-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bot className="w-5 h-5" />
                <span>AI Assistant</span>
              </motion.button>
              <motion.button
                onClick={() => setActiveSection('wizard')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeSection === 'wizard'
                    ? 'bg-gradient-to-r from-web3-primary to-web3-accent text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-web3-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wand2 className="w-5 h-5" />
                <span>Setup Wizard</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[600px]"
          >
            {activeSection === 'chat' ? <ChatBot /> : <SetupWizard />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-web3-primary/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-web3-primary to-web3-accent rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Node Assist</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate AI-powered assistant for Web3 node deployment.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-web3-primary/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Node Assist. Built with ❤️ for the Web3 community.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
