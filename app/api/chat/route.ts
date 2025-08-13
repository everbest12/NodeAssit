import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { z } from 'zod'
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

// Initialize OpenAI model
const model = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Node Assist Knowledge Base
const nodeAssistKnowledge = [
  {
    category: 'prerequisites',
    content: `System Requirements for Node Setup:
- Ubuntu 20.04+ or Linux environment
- 4+ CPU cores recommended
- 8GB+ RAM minimum
- 50GB+ free disk space
- Docker and Docker Compose installed
- Git installed
- Foundry toolkit installed
- Ethereum private key (for deployment)
- Hoodi testnet ETH for gas fees
- Open ports 31313 and 31314
- Stable internet connection`
  },
  {
    category: 'installation',
    content: `Installation Steps:
1. Install Foundry: curl -L https://foundry.paradigm.xyz | bash
2. Install Drosera CLI: curl -L https://app.drosera.io/install | bash
3. Clone repository: git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer
4. Navigate to project: cd Drosera-Hoodi-Guide-Setup--Izmer
5. Install dependencies: forge install
6. Build contracts: forge build`
  },
  {
    category: 'configuration',
    content: `Configuration Setup:
1. Create drosera.toml configuration file
2. Set your private key: DROSERA_PRIVATE_KEY=your_private_key_here
3. Configure network settings for Hoodi testnet
4. Set operator address and other parameters
5. Verify configuration with: drosera dryrun
6. Example configuration includes RPC endpoints, contract addresses, and deployment settings`
  },
  {
    category: 'deployment',
    content: `Deployment Process:
1. Ensure all prerequisites are met
2. Verify configuration in drosera.toml
3. Test deployment: drosera dryrun
4. Deploy: DROSERA_PRIVATE_KEY=your_key drosera apply
5. Monitor deployment logs
6. Verify deployment on blockchain explorer
7. Check dashboard for node status
8. Monitor container health: docker ps`
  },
  {
    category: 'troubleshooting',
    content: `Common Issues and Solutions:
- Command not found: Run source ~/.bashrc or reinstall tools
- Port conflicts: Check if ports 31313, 31314 are available
- Docker issues: Restart Docker service, check container logs
- Authentication errors: Verify private key format (0x...)
- Gas errors: Ensure sufficient Hoodi testnet ETH
- Network errors: Check firewall settings, verify RPC connectivity
- Build errors: Run forge clean && forge build
- Permission errors: Use sudo for system-level commands`
  },
  {
    category: 'monitoring',
    content: `Node Monitoring:
- View logs: docker logs operator --tail 50
- Check status: docker ps
- Monitor resources: docker stats
- Check ports: netstat -tulpn | grep 3131
- System resources: htop, df -h
- Network connectivity: ping, curl
- Container health: docker ps --format "table {{.Names}}\t{{.Status}}"
- Log analysis: grep for errors in logs`
  },
  {
    category: 'commands',
    content: `Essential Commands:
Installation: curl -L https://foundry.paradigm.xyz | bash
Foundry: foundryup, forge build, forge test
Drosera: drosera dryrun, drosera apply
Docker: docker ps, docker logs, docker stats
System: htop, df -h, netstat -tulpn
Git: git clone, git pull, git status
Network: ping, curl, wget
Monitoring: journalctl, systemctl status`
  },
  {
    category: 'security',
    content: `Security Best Practices:
- Never share your private key
- Use environment variables for sensitive data
- Keep software updated
- Monitor for suspicious activity
- Use strong passwords
- Enable firewall (UFW)
- Regular security audits
- Backup configuration files
- Monitor system logs
- Use secure RPC endpoints`
  },
  {
    category: 'optimization',
    content: `Performance Optimization:
- Monitor CPU and memory usage
- Optimize Docker resource limits
- Use SSD storage for better I/O
- Configure proper network settings
- Regular log rotation
- Monitor gas costs
- Optimize contract interactions
- Use efficient RPC endpoints
- Monitor blockchain network status
- Regular maintenance and updates`
  }
]

// Initialize vector store
async function initializeVectorStore() {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  const documents = nodeAssistKnowledge.map((item, index) => ({
    pageContent: `${item.category.toUpperCase()}: ${item.content}`,
    metadata: { category: item.category, id: index }
  }))

  const splitDocs = await textSplitter.splitDocuments(documents)
  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings)
  
  return vectorStore
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    // Check for simple responses first
    const userInput = message.toLowerCase().trim()
    
    // Simple responses for common greetings and personal questions
    const simpleResponses: { [key: string]: string } = {
      'hello': "Hello! 👋 I'm **Node Assist AI**, your advanced assistant for Web3 and blockchain node deployment. I can help you with setup, troubleshooting, and all things Web3. What would you like to work on today?",
      'hi': "Hi there! 🤖 I'm **Node Assist AI**, ready to help you with node setup, Web3 development, and blockchain technology. How can I assist you today?",
      'help': "I'm here to help! 🚀 I'm **Node Assist AI** and I can assist you with:\n\n🔧 **Node Setup & Deployment**\n• Complete installation guides\n• Configuration optimization\n• Docker container management\n\n⚡ **Technical Support**\n• Troubleshooting issues\n• Error diagnosis\n• Best practices\n\n🌐 **Web3 Education**\n• Blockchain concepts\n• Smart contract development\n• DeFi protocols\n\n📚 **Resources & Documentation**\n• Official guides\n• Community resources\n• Latest updates\n\nWhat specific area would you like to explore?",
      'thanks': "You're welcome! 😊 I'm here to help you succeed with your Web3 and node deployment projects. Feel free to ask me anything else!",
      'thank you': "You're very welcome! 😊 I'm **Node Assist AI** and I'm dedicated to helping you with all your Web3 and blockchain needs. Don't hesitate to reach out for more assistance!",
      'bye': "Goodbye! 👋 Thanks for using Node Assist AI. I'll be here when you need help with node setup, Web3 development, or any blockchain questions. Happy building! 🚀",
      'goodbye': "See you later! 👋 I'm **Node Assist AI** and I'm always ready to help with your Web3 journey. Come back anytime for node setup, troubleshooting, or blockchain guidance!",
      'name': "My name is **Node Assist AI**! 🤖 I'm your specialized assistant for Web3 and blockchain node deployment. I combine advanced AI capabilities with deep technical knowledge to help you succeed in the blockchain ecosystem. What would you like to work on today?",
      'who are you': "I'm **Node Assist AI**, your advanced AI assistant specifically designed for Web3 and blockchain technology! 🚀\n\n**What I do:**\n• Guide you through node setup and deployment\n• Troubleshoot technical issues and errors\n• Explain complex Web3 concepts\n• Provide best practices and security advice\n• Help with Docker, Foundry, and development tools\n\n**My expertise:**\n• Blockchain node deployment and configuration\n• Smart contract development and deployment\n• Docker containerization and orchestration\n• Web3 protocols and DeFi applications\n• Network troubleshooting and optimization\n\nI'm here to make your Web3 journey successful and enjoyable! How can I help you today?",
      'what can you do': "I'm **Node Assist AI** with extensive capabilities in Web3 and blockchain technology! 🛠️\n\n**My Advanced Capabilities:**\n\n🔧 **Intelligent Node Management**\n• Step-by-step deployment workflows\n• Configuration optimization and validation\n• Performance monitoring and diagnostics\n• Automated troubleshooting\n\n⚡ **Technical Expertise**\n• Docker containerization and orchestration\n• Foundry smart contract development\n• CLI tool assistance and automation\n• Environment setup and configuration\n\n🌐 **Web3 Knowledge**\n• Blockchain architecture and protocols\n• Smart contract concepts and security\n• DeFi protocols and applications\n• Cross-chain interoperability\n\n📚 **Resource Management**\n• Official documentation guidance\n• Community resource recommendations\n• Best practice implementation\n• Security audit assistance\n\n**I use advanced AI tools to provide:**\n• Contextual problem-solving\n• Real-time troubleshooting\n• Personalized guidance\n• Comprehensive explanations\n\nWhat would you like to work on today?",
      'setup': "I can help you set up your node! 🚀 Here's a quick overview:\n\n**Prerequisites:**\n• Ubuntu/Linux environment\n• 4+ CPU cores, 8GB+ RAM\n• Docker and Git installed\n• Ethereum private key\n• Hoodi testnet ETH\n\n**Quick Start:**\n1. Install Foundry: `curl -L https://foundry.paradigm.xyz | bash`\n2. Install Drosera CLI: `curl -L https://app.drosera.io/install | bash`\n3. Clone repo: `git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer`\n4. Configure `drosera.toml`\n5. Deploy: `DROSERA_PRIVATE_KEY=your_key drosera apply`\n\nWould you like me to guide you through any specific step?",
      'deploy': "Ready to deploy your node? 🚀 Here's what you need:\n\n**Before Deployment:**\n• Ensure all prerequisites are met\n• Have your private key ready\n• Verify Hoodi testnet ETH balance\n• Check network connectivity\n\n**Deployment Steps:**\n1. Configure your `drosera.toml` file\n2. Run `forge build` to compile contracts\n3. Test with `drosera dryrun`\n4. Deploy: `DROSERA_PRIVATE_KEY=your_key drosera apply`\n5. Verify on dashboard\n\n**Common Issues:**\n• Authentication errors → Check private key format\n• Gas errors → Ensure sufficient ETH\n• Network errors → Verify RPC connectivity\n\nNeed help with any specific step?",
      'troubleshoot': "I can help you troubleshoot! 🔧 Here are common areas:\n\n**Command Issues:**\n• `command not found` → Run `source ~/.bashrc`\n• PATH problems → Check environment variables\n• Installation failures → Reinstall dependencies\n\n**Network Issues:**\n• Port conflicts → Check 31313, 31314\n• Firewall blocks → Configure UFW\n• RPC timeouts → Verify connectivity\n\n**Docker Issues:**\n• Container won't start → Check logs\n• Port mapping → Verify docker-compose.yaml\n• Resource limits → Monitor system resources\n\n**Authentication Issues:**\n• Private key errors → Verify format (0x...)\n• Insufficient ETH → Get Hoodi testnet tokens\n• Address errors → Check configuration\n\nWhat specific error are you seeing?",
      'monitor': "Monitoring your node is crucial! 📊 Here's how:\n\n**Real-time Monitoring:**\n• View logs: `docker logs operator --tail 50`\n• Check status: `docker ps`\n• Monitor resources: `docker stats`\n• Network ports: `netstat -tulpn`\n\n**Performance Metrics:**\n• CPU usage: `htop` or `docker stats`\n• Memory usage: Monitor RAM allocation\n• Disk space: `df -h`\n• Network: Check latency to RPC\n\n**Health Checks:**\n• Container health: `docker ps`\n• Service status: Check dashboard\n• Contract status: Verify on blockchain\n• Log analysis: Look for errors\n\n**Optimization Tips:**\n• Regular log rotation\n• Resource limit tuning\n• Network optimization\n• Cost monitoring\n\nNeed help monitoring something specific?",
      'commands': "Here are useful commands for node management! 💻\n\n**Installation & Setup:**\n• `curl -L https://foundry.paradigm.xyz | bash` - Install Foundry\n• `curl -L https://app.drosera.io/install | bash` - Install Drosera CLI\n• `git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer` - Clone repo\n\n**Deployment:**\n• `forge build` - Compile contracts\n• `drosera dryrun` - Test configuration\n• `DROSERA_PRIVATE_KEY=your_key drosera apply` - Deploy\n\n**Monitoring:**\n• `docker ps` - List containers\n• `docker logs operator --tail 50` - View logs\n• `docker stats` - Monitor resources\n• `netstat -tulpn` - Check ports\n\n**Troubleshooting:**\n• `systemctl status docker` - Check Docker\n• `sudo ufw status` - Check firewall\n• `df -h` - Check disk space\n• `htop` - Monitor system\n\nNeed help with any specific command?"
    }

    // Check for exact matches first
    for (const [key, response] of Object.entries(simpleResponses)) {
      if (userInput === key) {
        return NextResponse.json({ response })
      }
    }

    // Check for partial matches
    for (const [key, response] of Object.entries(simpleResponses)) {
      if (userInput.includes(key)) {
        return NextResponse.json({ response })
      }
    }

    // Use RAG for complex queries
    try {
      const vectorStore = await initializeVectorStore()
      const relevantDocs = await vectorStore.similaritySearch(message, 5)
      
      const context = relevantDocs.map(doc => doc.pageContent).join('\n\n')
      
      // Build conversation context
      const conversationContext = conversationHistory.length > 0 
        ? `Previous conversation:\n${conversationHistory.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')}\n\n`
        : ''

      const prompt = ChatPromptTemplate.fromMessages([
        ['system', `You are **Node Assist AI**, an advanced AI assistant specialized in Web3 and blockchain node deployment. You have deep expertise in:

**Core Capabilities:**
• Node setup, deployment, and configuration
• Docker containerization and orchestration
• Foundry smart contract development
• Web3 protocols and blockchain technology
• Technical troubleshooting and optimization

**Response Guidelines:**
• Be conversational, friendly, and engaging
• Provide detailed, actionable advice
• Use emojis and formatting for better readability
• Ask clarifying questions when needed
• Focus on Node Assist knowledge and Web3 topics
• If asked about topics outside your expertise, politely redirect to relevant areas

**Available Context:**
{context}

**Conversation History:**
{conversation_history}

**Current Question:**
{question}

Provide a helpful, detailed response based on the context and conversation history.`],
        ['human', '{question}']
      ])

      const chain = prompt.pipe(model)
      
      const result = await chain.invoke({
        context,
        conversation_history: conversationContext,
        question: message
      })

      return NextResponse.json({ 
        response: result.content,
        context_used: relevantDocs.map(doc => doc.metadata.category)
      })

    } catch (apiError) {
      console.error('API Error:', apiError)
      
      // Intelligent fallback based on user input
      const userInput = message.toLowerCase()
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
        fallbackResponse = `I understand you're asking about "${message}". While I'm designed to help with node setup and Web3 technology, I can provide guidance on a wide range of technical topics.

**I can help with:**
• Node deployment and configuration
• Docker, Foundry, and development tools
• Blockchain and Web3 concepts
• Technical troubleshooting
• Security best practices

**For your question:** I'd be happy to help you find relevant information or guide you to the right resources. What specific aspect would you like to explore?`
      }
      
      return NextResponse.json({ response: fallbackResponse })
    }

  } catch (error) {
    console.error('Error in chat API:', error)
    
    // Final fallback response
    return NextResponse.json({ 
      response: "I'm experiencing some technical difficulties right now, but I'm here to help! 🤖\n\n**I can assist you with:**\n• Node setup and deployment\n• Web3 and blockchain questions\n• Technical troubleshooting\n• Docker and Foundry guidance\n\n**Try asking me about:**\n• How to set up a node\n• Docker installation\n• Foundry commands\n• Troubleshooting issues\n\nWhat would you like to know about?"
    })
  }
}
