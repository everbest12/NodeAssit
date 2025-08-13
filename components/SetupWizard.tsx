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
  Check,
  Info
} from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
  completed: boolean
  code?: string
  codeTitle?: string
  additionalInfo?: string
}

interface Toast {
  id: string
  message: string
  type: 'success' | 'error'
}

export default function SetupWizard() {
  const [currentStep, setCurrentStep] = useState(1)
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
      ),
      code: `curl -L https://foundry.paradigm.xyz | bash`,
      codeTitle: "Install Foundry",
      additionalInfo: "This command installs Foundry, a development environment for Ethereum smart contracts. It's required for building and testing your Drosera contracts."
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
      ),
      code: `git clone https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer
cd Drosera-Hoodi-Guide-Setup--Izmer`,
      codeTitle: "Clone Repository",
      additionalInfo: "This step involves cloning the Drosera-Hoodi-Guide-Setup repository from GitHub. This repository contains all the necessary configuration files and setup scripts."
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
      ),
      code: `ethereum_rpc = "https://ethereum-hoodi-rpc.publicnode.com"
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
address = "YOUR_TRAP_CONFIG_ADDRESS"`,
      codeTitle: "Trap Configuration",
      additionalInfo: "This step involves configuring the `drosera.toml` file with your network settings, trap address, and operator whitelist."
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
      ),
      code: `forge build
drosera dryrun
DROSERA_PRIVATE_KEY=your_private_key drosera apply`,
      codeTitle: "Deploy Trap",
      additionalInfo: "This step involves building the Drosera Trap contract, testing its configuration, and deploying it to the network."
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
      ),
      code: `version: '3.8'
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
   operator_data:
     nano .env
     SERVER_IP=your.server.ip
     OP_KEY=your_operator_private_key
     docker compose up -d
     docker logs operator --tail 50`,
      codeTitle: "Setup Operator",
      additionalInfo: "This step involves deploying and configuring the Drosera Operator. This operator is responsible for managing the P2P network and interacting with the Drosera network."
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
      ),
      code: `drosera-operator optin --eth-rpc-url https://ethereum-hoodi-rpc.publicnode.com --eth-private-key YOUR_WALLET_KEY --trap-config-address YOUR_TRAP_ADDRESS
https://app.drosera.io/
cast call 0x25E2CeF36020A736CF8a4D2cAdD2EBE3940F4608 "isResponder(address)(bool)" YOUR_ADDRESS --rpc-url https://ethereum-hoodi-rpc.publicnode.com
cast call 0x25E2CeF36020A736CF8a4D2cAdD2EBE3940F4608 "getDiscordNamesBatch(uint256,uint256)(string[])" 0 2000 --rpc-url https://ethereum-hoodi-rpc.publicnode.com`,
      codeTitle: "Register & Verify",
      additionalInfo: "This step involves registering your operator on the Drosera network and verifying its functionality."
    }
  ]

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId])
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      handleStepComplete(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
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
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3 md:mb-4">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg md:rounded-xl flex items-center justify-center">
              <Wand2 className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
              Setup Wizard
            </h1>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Follow this step-by-step guide to set up your node. Each step includes detailed instructions and code snippets.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <span className="text-sm md:text-base text-gray-400">Progress</span>
            <span className="text-sm md:text-base text-web3-primary font-medium">
              {currentStep} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-web3-dark/50 rounded-full h-2 md:h-3">
            <motion.div
              className="bg-gradient-to-r from-web3-primary to-web3-secondary h-2 md:h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-6 md:mb-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 md:space-y-6"
          >
            <div className="flex items-start space-x-3 md:space-x-4">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm md:text-lg">{currentStep}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>

            {/* Code Snippet */}
            {steps[currentStep - 1].code && (
              <div className="bg-web3-dark/50 border border-web3-primary/20 rounded-lg p-3 md:p-4">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-sm md:text-base text-gray-400 font-mono">
                    {steps[currentStep - 1].codeTitle}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(steps[currentStep - 1].code!)}
                    className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 md:py-2 bg-web3-primary/20 hover:bg-web3-primary/30 text-web3-primary rounded-lg text-xs md:text-sm font-medium transition-colors"
                  >
                    <Copy className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Copy</span>
                  </motion.button>
                </div>
                <pre className="text-xs md:text-sm text-gray-300 overflow-x-auto">
                  <code>{steps[currentStep - 1].code}</code>
                </pre>
              </div>
            )}

            {/* Additional Info */}
            {steps[currentStep - 1].additionalInfo && (
              <div className="bg-web3-accent/10 border border-web3-accent/20 rounded-lg p-3 md:p-4">
                <div className="flex items-start space-x-2 md:space-x-3">
                  <Info className="w-4 h-4 md:w-5 md:h-5 text-web3-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm md:text-base font-medium text-web3-accent mb-1 md:mb-2">
                      Additional Information
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      {steps[currentStep - 1].additionalInfo}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-transparent border border-web3-primary/50 text-web3-primary rounded-lg font-medium hover:border-web3-primary hover:bg-web3-primary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            <span>Previous</span>
          </motion.button>

          <div className="flex items-center space-x-2 md:space-x-4">
            {currentStep < steps.length ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-web3-primary to-web3-secondary text-white rounded-lg font-medium hover:shadow-lg hover:shadow-web3-primary/25 transition-all duration-300 text-sm md:text-base"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://app.drosera.io/', '_blank')}
                className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-web3-accent to-web3-purple text-white rounded-lg font-medium hover:shadow-lg hover:shadow-web3-accent/25 transition-all duration-300 text-sm md:text-base"
              >
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                <span>View Dashboard</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="mt-6 md:mt-8">
          <div className="flex justify-center space-x-2 md:space-x-3">
            {steps.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentStep(index + 1)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentStep === index + 1
                    ? 'bg-web3-primary scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
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
