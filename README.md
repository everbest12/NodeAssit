# Drosera Web3 Assistant

A modern, AI-powered website for the Drosera Web3 project that helps users set up and manage their nodes through an intelligent chatbot and step-by-step setup wizard.

## Features

### 🤖 AI Chatbot
- **Intelligent Q&A**: Powered by OpenAI GPT-4 with context from project documentation
- **FAQ Integration**: Pulls from the official Drosera FAQ database
- **Error Resolution**: Helps troubleshoot common setup issues
- **Rating System**: Users can rate responses to improve AI learning
- **Copy Functionality**: Easy copying of code snippets and commands

### 🪄 Setup Wizard
- **Step-by-Step Guidance**: 6 comprehensive steps from prerequisites to verification
- **Interactive Progress**: Visual progress tracking with completion status
- **Code Snippets**: One-click copy for all commands and configurations
- **Real-time Validation**: Checks and confirms each step
- **GitHub Integration**: Based on the official Drosera setup repository

### 🎨 Modern UI/UX
- **Web3 Aesthetic**: Cyberpunk-inspired design with gradients and animations
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Dark Theme**: Easy on the eyes for extended use
- **Accessibility**: Keyboard navigation and screen reader support

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom web3 theme
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-4 API
- **Icons**: Lucide React
- **Markdown**: React Markdown with syntax highlighting

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd drosera-web3-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── api/chat/          # AI chatbot API endpoint
│   ├── globals.css        # Global styles and web3 theme
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page with navigation
├── components/
│   ├── ChatBot.tsx        # AI chatbot component
│   └── SetupWizard.tsx    # Step-by-step setup wizard
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## Configuration

### AI Chatbot
The chatbot integrates with:
- **OpenAI GPT-4**: For intelligent responses
- **FAQ Database**: From Drosera's official documentation
- **GitHub Repository**: For up-to-date setup information

### Setup Wizard
The wizard is based on:
- **GitHub Repository**: https://github.com/izmerGhub/Drosera-Hoodi-Guide-Setup--Izmer
- **Official Documentation**: Step-by-step setup guide
- **Best Practices**: Security and optimization recommendations

## Customization

### Adding New FAQ Items
Edit the `faqData` array in `app/api/chat/route.ts`:

```typescript
const faqData = [
  {
    question: "Your question here?",
    answer: "Your answer here with markdown support",
    category: "Category"
  }
]
```

### Modifying Setup Steps
Edit the `steps` array in `components/SetupWizard.tsx`:

```typescript
const steps: Step[] = [
  {
    id: 1,
    title: "Step Title",
    description: "Step description",
    icon: <YourIcon />,
    content: <YourStepContent />
  }
]
```

### Styling
The web3 theme is defined in `tailwind.config.js` and `app/globals.css`. Key classes:
- `.web3-card`: Glassmorphism cards
- `.web3-button`: Gradient buttons
- `.web3-input`: Styled form inputs
- `.glow-text`: Text with glow effect

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- **Documentation**: Check the setup wizard for detailed instructions
- **AI Assistant**: Use the chatbot for instant help
- **GitHub Issues**: Report bugs or request features
- **Discord**: Join the Drosera community

## Acknowledgments

- **Drosera Team**: For the excellent documentation and setup guides
- **OpenAI**: For providing the AI capabilities
- **Next.js Team**: For the amazing framework
- **Tailwind CSS**: For the utility-first styling approach

---

Built with ❤️ for the Web3 community
