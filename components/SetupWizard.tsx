'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wand2, 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  ExternalLink, 
  Terminal, 
  Server, 
  Settings,
  Download,
  GitBranch,
  Code,
  Play,
  Shield,
  Monitor,
  Check
} from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
  completed: boolean
}

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
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
      console.error('Failed to copy text:', error)
      showToast('Failed to copy text', 'error')
    }
  }

  const steps: Step[] = [
    {
      id: 1,
      title: "Prerequisites",
      description: "System requirements and dependencies",
      icon: <Shield className="w-6 h-6" />,
      completed: completedSteps.includes(1),
      content: (
        <div className="space-y-6">
          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">System Requirements</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Ubuntu/Linux environment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">At least 4 CPU cores</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">8GB RAM recommended</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Basic CLI knowledge</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Open ports: 31313, 31314</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Ethereum private key</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Hoodi testnet ETH</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Docker installed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Install Dependencies</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Install Foundry</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">curl -L https://foundry.paradigm.xyz | bash</code>
                  <button 
                    onClick={() => copyToClipboard('curl -L https://foundry.paradigm.xyz | bash')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Install Drosera CLI</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">curl -L https://app.drosera.io/install | bash</code>
                  <button 
                    onClick={() => copyToClipboard('curl -L https://app.drosera.io/install | bash')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Clone Repository",
      description: "Get the setup guide and configuration files",
      icon: <GitBranch className="w-6 h-6" />,
      completed: completedSteps.includes(2),
      content: (
        <div className="space-y-6">
          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Clone the Repository</h3>
            <div className="space-y-4">
              <div className="bg-web3-dark/50 rounded-lg p-4">
                <code className="text-green-400">git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer</code>
                <button 
                  onClick={() => copyToClipboard('git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer')}
                  className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-web3-dark/50 rounded-lg p-4">
                <code className="text-green-400">cd Drosera-Hoodi-Guide-Setup--Izmer</code>
                <button 
                  onClick={() => copyToClipboard('cd Drosera-Hoodi-Guide-Setup--Izmer')}
                  className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Repository Structure</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <FileIcon />
                <span>README.md - Setup guide and documentation</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileIcon />
                <span>drosera.toml - Main configuration file</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileIcon />
                <span>docker-compose.yaml - Operator deployment</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileIcon />
                <span>src/ - Source code and contracts</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Configure Trap",
      description: "Set up your Drosera Trap configuration",
      icon: <Settings className="w-6 h-6" />,
      completed: completedSteps.includes(3),
      content: (
        <div className="space-y-6">
          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Trap Configuration</h3>
            <p className="text-gray-300 mb-4">
              Configure your <code className="bg-web3-dark/50 px-2 py-1 rounded">drosera.toml</code> file with the correct network settings.
            </p>
            
            <div className="bg-web3-dark/50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-green-400">
{`ethereum_rpc = "https://ethereum-hoodi-rpc.publicnode.com"
drosera_rpc = "https://relay.hoodi.drosera.io"
eth_chain_id = 560048
drosera_address = "0x91cB447BaFc6e0EA0F4Fe056F5a9b1F14bb06e5D"

[traps]
[traps.mytrap]
path = "out/Trap.sol/Trap.json"
response_contract = "0x25E2CeF36020A736CF8a4D2cAdD2EBE3940F4608"
response_function = "respondWithDiscordName(string)"
cooldown_period_blocks = 33
min_number_of_operators = 1
max_number_of_operators = 2
block_sample_size = 10
private_trap = true
whitelist = ["YOUR_OPERATOR_ADDRESS"]
address = "YOUR_TRAP_CONFIG_ADDRESS"`}
              </pre>
              <button 
                onClick={() => copyToClipboard(`ethereum_rpc = "https://ethereum-hoodi-rpc.publicnode.com"
drosera_rpc = "https://relay.hoodi.drosera.io"
eth_chain_id = 560048
drosera_address = "0x91cB447BaFc6e0EA0F4Fe056F5a9b1F14bb06e5D"

[traps]
[traps.mytrap]
path = "out/Trap.sol/Trap.json"
response_contract = "0x25E2CeF36020A736CF8a4D2cAdD2EBE3940F4608"
response_function = "respondWithDiscordName(string)"
cooldown_period_blocks = 33
min_number_of_operators = 1
max_number_of_operators = 2
block_sample_size = 10
private_trap = true
whitelist = ["YOUR_OPERATOR_ADDRESS"]
address = "YOUR_TRAP_CONFIG_ADDRESS"`)}
                className="mt-2 p-2 text-gray-400 hover:text-web3-primary"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Important Notes</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Replace <code className="bg-web3-dark/50 px-1 rounded">YOUR_OPERATOR_ADDRESS</code> with your actual operator address</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Replace <code className="bg-web3-dark/50 px-1 rounded">YOUR_TRAP_CONFIG_ADDRESS</code> after deployment</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ensure you have sufficient Hoodi testnet ETH for deployment</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Deploy Trap",
      description: "Build and deploy your Drosera Trap",
      icon: <Play className="w-6 h-6" />,
      completed: completedSteps.includes(4),
      content: (
        <div className="space-y-6">
          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Build and Deploy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">1. Build the Contract</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">forge build</code>
                  <button 
                    onClick={() => copyToClipboard('forge build')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">2. Test the Configuration</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">drosera dryrun</code>
                  <button 
                    onClick={() => copyToClipboard('drosera dryrun')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">3. Deploy the Trap</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">DROSERA_PRIVATE_KEY=your_private_key drosera apply</code>
                  <button 
                    onClick={() => copyToClipboard('DROSERA_PRIVATE_KEY=your_private_key drosera apply')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Replace <code className="bg-web3-dark/50 px-1 rounded">your_private_key</code> with your actual Ethereum private key
                </p>
              </div>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Deployment Checklist</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Contract compiled successfully</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Configuration validated</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Sufficient Hoodi ETH balance</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Trap deployed to network</span>
              </div>
              <div className="flex items-center space-x-3">
                <Circle className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Trap address recorded</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Setup Operator",
      description: "Deploy and configure your Drosera Operator",
      icon: <Server className="w-6 h-6" />,
      completed: completedSteps.includes(5),
      content: (
        <div className="space-y-6">
          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Operator Configuration</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Create Docker Compose File</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4 overflow-x-auto">
                                     <pre className="text-sm text-green-400">
 {`version: '3.8'
 services:
   operator:
     image: ghcr.io/drosera-network/drosera-operator:latest
     network_mode: host
     command: ["node"]
     environment:
       - DRO__ETH__CHAIN_ID=560048
       - DRO__ETH__RPC_URL=https://rpc.hoodi.ethpandaops.io
       - DRO__ETH__PRIVATE_KEY=\${OP_KEY}
       - DRO__NETWORK__P2P_PORT=31313
       - DRO__SERVER__PORT=31314
       - DRO__NETWORK__EXTERNAL_P2P_ADDRESS=\${SERVER_IP}
       - DRO__DISABLE_DNR_CONFIRMATION=true
       - DRO__LOG__LEVEL=debug
     volumes:
       - operator_data:/data
     restart: always

 volumes:
   operator_data:`}
                   </pre>
                                     <button 
                     onClick={() => copyToClipboard(`version: '3.8'
 services:
   operator:
     image: ghcr.io/drosera-network/drosera-operator:latest
     network_mode: host
     command: ["node"]
     environment:
       - DRO__ETH__CHAIN_ID=560048
       - DRO__ETH__RPC_URL=https://rpc.hoodi.ethpandaops.io
       - DRO__ETH__PRIVATE_KEY=\${OP_KEY}
       - DRO__NETWORK__P2P_PORT=31313
       - DRO__SERVER__PORT=31314
       - DRO__NETWORK__EXTERNAL_P2P_ADDRESS=\${SERVER_IP}
       - DRO__DISABLE_DNR_CONFIRMATION=true
       - DRO__LOG__LEVEL=debug
     volumes:
       - operator_data:/data
     restart: always

 volumes:
   operator_data:`)}
                    className="mt-2 p-2 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Create Environment File</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">nano .env</code>
                  <button 
                    onClick={() => copyToClipboard('nano .env')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-web3-dark/50 rounded-lg p-4 mt-2">
                  <pre className="text-sm text-green-400">
{`SERVER_IP=your.server.ip
OP_KEY=your_operator_private_key`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Start the Operator</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Launch Operator</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">docker compose up -d</code>
                  <button 
                    onClick={() => copyToClipboard('docker compose up -d')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Check Logs</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">docker logs operator --tail 50</code>
                  <button 
                    onClick={() => copyToClipboard('docker logs operator --tail 50')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Register & Verify",
      description: "Register your operator and verify everything is working",
      icon: <CheckCircle className="w-6 h-6" />,
      completed: completedSteps.includes(6),
      content: (
        <div className="space-y-6">
          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Register Your Operator</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Opt-in Command</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">drosera-operator optin --eth-rpc-url https://ethereum-hoodi-rpc.publicnode.com --eth-private-key YOUR_WALLET_KEY --trap-config-address YOUR_TRAP_ADDRESS</code>
                  <button 
                    onClick={() => copyToClipboard('drosera-operator optin --eth-rpc-url https://ethereum-hoodi-rpc.publicnode.com --eth-private-key YOUR_WALLET_KEY --trap-config-address YOUR_TRAP_ADDRESS')}
                    className="ml-2 p-1 text-gray-400 hover:text-web3-primary"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-5 h-5 text-web3-primary" />
                <a 
                  href="https://app.drosera.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-web3-primary hover:text-white transition-colors"
                >
                  Or register through the dashboard
                </a>
              </div>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Verification Steps</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Check Dashboard</h4>
                <p className="text-gray-300 mb-2">Visit the Drosera dashboard to verify your setup:</p>
                <a 
                  href="https://app.drosera.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-web3-primary hover:text-white transition-colors"
                >
                  <span>https://app.drosera.io/</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Verify Response Contract</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">cast call 0x25E2CeF36020A736CF8a4D2cAdD2EBE3940F4608 "isResponder(address)(bool)" YOUR_ADDRESS --rpc-url https://ethereum-hoodi-rpc.publicnode.com</code>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Check Discord Names</h4>
                <div className="bg-web3-dark/50 rounded-lg p-4">
                  <code className="text-green-400">cast call 0x25E2CeF36020A736CF8a4D2cAdD2EBE3940F4608 "getDiscordNamesBatch(uint256,uint256)(string[])" 0 2000 --rpc-url https://ethereum-hoodi-rpc.publicnode.com</code>
                </div>
              </div>
            </div>
          </div>

          <div className="web3-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">🎉 Congratulations!</h3>
            <p className="text-gray-300 mb-4">
              You've successfully set up your Drosera node! Your trap and operator are now running and contributing to the network.
            </p>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Trap deployed and configured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Operator running and connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Registration completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Network participation active</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId])
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      handleStepComplete(steps[currentStep].id)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
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

      <div className="web3-card p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-web3-secondary to-web3-purple rounded-xl flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Setup Wizard</h2>
            <p className="text-gray-400">Step-by-step guide to deploy your node</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-web3-primary to-web3-secondary text-white' 
                        : 'bg-web3-dark/50 text-gray-400'
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      index <= currentStep ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index < currentStep ? 'bg-gradient-to-r from-web3-primary to-web3-secondary' : 'bg-web3-dark/50'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep].content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-web3-dark/50 border border-web3-primary/30 rounded-lg text-gray-300 hover:bg-web3-primary/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-web3-primary to-web3-secondary text-white rounded-lg hover:from-web3-secondary hover:to-web3-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

const FileIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
)
