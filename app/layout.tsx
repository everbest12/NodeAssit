import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Node Assist - AI-Powered Node Setup Assistant',
  description: 'AI-powered setup wizard and chatbot for seamless node deployment and management',
  keywords: 'web3, blockchain, node setup, AI assistant, deployment, troubleshooting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-web3-darker via-web3-dark to-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}
