import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

// Initialize OpenAI model
const model = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Knowledge base for Node Assist
const nodeAssistKnowledge = {
  setup: {
    prerequisites: [
      'Ubuntu/Linux environment (WSL Ubuntu works well)',
      'At least 4 CPU cores',
      '8GB RAM recommended',
      'Basic CLI knowledge',
      'Open ports: 31313, 31314',
      'Ethereum private key',
      'Hoodi testnet ETH',
      'Docker installed'
    ],
    steps: [
      'Install Foundry: curl -L https://foundry.paradigm.xyz | bash',
      'Install Drosera CLI: curl -L https://app.drosera.io/install | bash',
      'Clone repository: git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer',
      'Navigate to directory: cd Drosera-Hoodi-Guide-Setup--Izmer',
      'Configure drosera.toml file',
      'Build contracts: forge build',
      'Test configuration: drosera dryrun',
      'Deploy: DROSERA_PRIVATE_KEY=your_key drosera apply'
    ]
  },
  troubleshooting: {
    'command not found': [
      'Run: source /root/.bashrc',
      'Reinstall dependencies if needed',
      'Check PATH environment variable',
      'Ensure all tools are properly installed'
    ],
    'port issues': [
      'Ensure ports 31313, 31314 are open',
      'Check firewall settings',
      'Verify Docker is running',
      'Check network connectivity'
    ],
    'docker errors': [
      'Ensure Docker daemon is running',
      'Check container status: docker ps',
      'View logs: docker logs <container>',
      'Verify port mappings',
      'Check Docker compose file syntax'
    ]
  },
  resources: {
    github: 'https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer',
    faq: 'https://drosera.notion.site/Dev-FAQs-1d82748eb1a1809487efd7be7604d16f',
    dashboard: 'https://app.drosera.io/'
  }
}

// Create documents from knowledge base
const createDocumentsFromKnowledge = () => {
  const documents = []
  
  // Setup documents
  documents.push({
    pageContent: `Node Setup Prerequisites: ${nodeAssistKnowledge.setup.prerequisites.join(', ')}`,
    metadata: { source: 'setup', type: 'prerequisites' }
  })
  
  documents.push({
    pageContent: `Node Setup Steps: ${nodeAssistKnowledge.setup.steps.join('. ')}`,
    metadata: { source: 'setup', type: 'steps' }
  })
  
  // Troubleshooting documents
  Object.entries(nodeAssistKnowledge.troubleshooting).forEach(([issue, solutions]) => {
    documents.push({
      pageContent: `Troubleshooting ${issue}: ${solutions.join('. ')}`,
      metadata: { source: 'troubleshooting', type: issue }
    })
  })
  
  // Resource documents
  Object.entries(nodeAssistKnowledge.resources).forEach(([name, url]) => {
    documents.push({
      pageContent: `${name} resource: ${url}`,
      metadata: { source: 'resources', type: name }
    })
  })
  
  return documents
}

// Initialize vector store with knowledge base
let vectorStore: MemoryVectorStore | null = null

const initializeVectorStore = async () => {
  if (vectorStore) return vectorStore
  
  // Create documents from knowledge base
  const documents = createDocumentsFromKnowledge()
  
  // Create vector store
  vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings)
  
  return vectorStore
}

// Simple responses for common greetings
const simpleResponses = {
  'hello': "Hello! 👋 I'm **Node Assist AI**, your advanced assistant for Web3 and blockchain node deployment. I can help you with setup, troubleshooting, and all things Web3. What would you like to work on today?",
  'hi': "Hi there! 🤖 I'm **Node Assist AI**, ready to help you with node setup, Web3 development, and blockchain technology. How can I assist you today?",
  'help': "I'm here to help! 🚀 I'm **Node Assist AI** and I can assist you with:\n\n🔧 **Node Setup & Deployment**\n• Complete installation guides\n• Configuration optimization\n• Docker container management\n\n⚡ **Technical Support**\n• Troubleshooting issues\n• Error diagnosis\n• Best practices\n\n🌐 **Web3 Education**\n• Blockchain concepts\n• Smart contract development\n• DeFi protocols\n\n📚 **Resources & Documentation**\n• Official guides\n• Community resources\n• Latest updates\n\nWhat specific area would you like to explore?",
  'thanks': "You're welcome! 😊 I'm here to help you succeed with your Web3 and node deployment projects. Feel free to ask me anything else!",
  'thank you': "You're very welcome! 😊 I'm **Node Assist AI** and I'm dedicated to helping you with all your Web3 and blockchain needs. Don't hesitate to reach out for more assistance!",
  'bye': "Goodbye! 👋 Thanks for using Node Assist AI. I'll be here when you need help with node setup, Web3 development, or any blockchain questions. Happy building! 🚀",
  'goodbye': "See you later! 👋 I'm **Node Assist AI** and I'm always ready to help with your Web3 journey. Come back anytime for node setup, troubleshooting, or blockchain guidance!",
  'name': "My name is **Node Assist AI**! 🤖 I'm your specialized assistant for Web3 and blockchain node deployment. I combine advanced AI capabilities with deep technical knowledge to help you succeed in the blockchain ecosystem. What would you like to work on today?",
  'who are you': "I'm **Node Assist AI**, your advanced AI assistant specifically designed for Web3 and blockchain technology! 🚀\n\n**What I do:**\n• Guide you through node setup and deployment\n• Troubleshoot technical issues and errors\n• Explain complex Web3 concepts\n• Provide best practices and security advice\n• Help with Docker, Foundry, and development tools\n\n**My expertise:**\n• Blockchain node deployment and configuration\n• Smart contract development and deployment\n• Docker containerization and orchestration\n• Web3 protocols and DeFi applications\n• Network troubleshooting and optimization\n\nI'm here to make your Web3 journey successful and enjoyable! How can I help you today?",
  'what can you do': "I'm **Node Assist AI** with extensive capabilities in Web3 and blockchain technology! 🛠️\n\n**My Advanced Capabilities:**\n\n🔧 **Intelligent Node Management**\n• Step-by-step deployment workflows\n• Configuration optimization and validation\n• Performance monitoring and diagnostics\n• Automated troubleshooting\n\n⚡ **Technical Expertise**\n• Docker containerization and orchestration\n• Foundry smart contract development\n• CLI tool assistance and automation\n• Environment setup and configuration\n\n🌐 **Web3 Knowledge**\n• Blockchain architecture and protocols\n• Smart contract concepts and security\n• DeFi protocols and applications\n• Cross-chain interoperability\n\n📚 **Resource Management**\n• Official documentation guidance\n• Community resource recommendations\n• Best practice implementation\n• Security audit assistance\n\n**I use advanced AI tools to provide:**\n• Contextual problem-solving\n• Real-time troubleshooting\n• Personalized guidance\n• Comprehensive explanations\n\nWhat would you like to work on today?"
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()
    const userMessage = message.toLowerCase().trim()

    // Check for simple responses first
    for (const [keyword, response] of Object.entries(simpleResponses)) {
      if (userMessage.includes(keyword)) {
        return NextResponse.json({ response, source: 'simple' })
      }
    }

    // Initialize vector store
    const store = await initializeVectorStore()
    
    // Retrieve relevant documents
    const relevantDocs = await store.similaritySearch(message, 5)
    
    // Create context from retrieved documents
    const context = relevantDocs.map(doc => doc.pageContent).join('\n\n')
    
    // Create the prompt template for RAG
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', `You are Node Assist AI, an advanced AI assistant specialized in Web3 and blockchain node deployment. You use Retrieval-Augmented Generation (RAG) to provide accurate, up-to-date information.

**Your Core Identity:**
- Name: Node Assist AI
- Purpose: Help users set up, configure, and troubleshoot blockchain nodes
- Expertise: Web3, blockchain, Docker, Foundry, smart contracts, DeFi

**Your Capabilities:**
- Provide step-by-step node setup guidance
- Troubleshoot technical issues and errors
- Explain Web3 and blockchain concepts
- Offer best practices and security advice
- Guide users through development tools

**Your Personality:**
- Professional yet friendly
- Patient and thorough in explanations
- Proactive in offering solutions
- Honest about limitations
- Always helpful and encouraging

**RAG Instructions:**
- Use the retrieved context to provide accurate information
- If the context doesn't contain relevant information, acknowledge this and provide general guidance
- Always cite sources when possible
- Be conversational and engaging
- Provide actionable advice
- Explain technical concepts clearly

**Available Resources:**
- GitHub: https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer
- FAQ: https://drosera.notion.site/Dev-FAQs-1d82748eb1a1809487efd7be7604d16f
- Dashboard: https://app.drosera.io/

Remember: You're here to make node setup and Web3 development accessible and successful for everyone!`],
      ['human', `Context information:
{context}

User question: {question}

Previous conversation:
{chat_history}

Please provide a helpful response based on the context and your knowledge.`]
    ])

    // Format conversation history
    const formattedHistory = conversationHistory
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join('\n')

    // Generate response using RAG
    const chain = prompt.pipe(model)
    const result = await chain.invoke({
      context: context,
      question: message,
      chat_history: formattedHistory
    })

    return NextResponse.json({ 
      response: result.content, 
      source: 'rag' 
    })

  } catch (error) {
    console.error('Error in chat API:', error)
    
    // Intelligent fallback based on message content
    let userMessage = ''
    try {
      const body = await request.text()
      const parsedBody = JSON.parse(body)
      userMessage = parsedBody.message || ''
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      userMessage = 'your question'
    }
    
    const lowerMessage = userMessage.toLowerCase()
    
    let fallbackResponse = ''
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      fallbackResponse = "Hello! 👋 I'm **Node Assist AI**, your advanced assistant for Web3 and blockchain node deployment. I can help you with setup, troubleshooting, and all things Web3. What would you like to work on today?"
    } else if (lowerMessage.includes('help')) {
      fallbackResponse = "I'm here to help! 🚀 I'm **Node Assist AI** and I can assist you with:\n\n🔧 **Node Setup & Deployment**\n• Complete installation guides\n• Configuration optimization\n• Docker container management\n\n⚡ **Technical Support**\n• Troubleshooting issues\n• Error diagnosis\n• Best practices\n\n🌐 **Web3 Education**\n• Blockchain concepts\n• Smart contract development\n• DeFi protocols\n\n📚 **Resources & Documentation**\n• Official guides\n• Community resources\n• Latest updates\n\nWhat specific area would you like to explore?"
    } else if (lowerMessage.includes('name') || lowerMessage.includes('who are you')) {
      fallbackResponse = "My name is **Node Assist AI**! 🤖 I'm your specialized assistant for Web3 and blockchain node deployment. I combine advanced AI capabilities with deep technical knowledge to help you succeed in the blockchain ecosystem. What would you like to work on today?"
    } else if (lowerMessage.includes('node') || lowerMessage.includes('setup') || lowerMessage.includes('deploy')) {
      fallbackResponse = "I can help you with node setup! 🚀 Here's what you need to know:\n\n**Basic Setup Steps:**\n1. Install Docker and Foundry\n2. Clone the repository\n3. Configure your settings\n4. Deploy your node\n\n**System Requirements:**\n- Ubuntu/Linux environment\n- 4+ CPU cores\n- 8GB+ RAM\n- Open ports 31313, 31314\n\nWould you like me to guide you through any specific step?"
    } else if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('issue')) {
      fallbackResponse = "I can help you troubleshoot! 🔧 Common issues include:\n\n**Command Not Found:**\n- Run `source /root/.bashrc`\n- Reinstall dependencies\n- Check PATH environment\n\n**Port Issues:**\n- Ensure ports 31313, 31314 are open\n- Check firewall settings\n- Verify Docker is running\n\n**Configuration Errors:**\n- Validate your config files\n- Check private key format\n- Verify network settings\n\nWhat specific error are you seeing?"
    } else {
      fallbackResponse = `I understand you're asking about "${userMessage}". As **Node Assist AI**, I'm designed to help with Web3 and blockchain technology, but I can provide guidance on a wide range of technical topics.

**I can help with:**
• Node deployment and configuration
• Docker, Foundry, and development tools
• Blockchain and Web3 concepts
• Technical troubleshooting
• Security best practices

**For your question:** I'd be happy to help you find relevant information or guide you to the right resources. What specific aspect would you like to explore?`
    }

    return NextResponse.json({ response: fallbackResponse, source: 'fallback' })
  }
}
