'use client'

import { useState } from 'react'
import { Send, MessageCircle } from 'lucide-react'

export default function CopilotPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m the SPECTRA Security Copilot. I can help you understand threats, generate incident reports, suggest mitigation strategies, and answer security questions. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input }])
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'This DDoS attack pattern suggests volumetric flooding from multiple botnet nodes. I recommend implementing rate limiting and traffic scrubbing.',
        'The SQL injection detected has a 98.7% confidence score based on keyword detection and payload analysis from the database logs.',
        'Port scan activity on ports 22, 80, 445 suggests reconnaissance. Consider implementing network segmentation.',
        'This threat has been successfully contained by our CDL layer. No further action required at this time.',
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
    }, 1000)

    setInput('')
  }

  return (
    <div className="p-8 h-[calc(100vh-100px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">AI Security Copilot</h1>
        <p className="text-muted-foreground mt-1">Chat with SPECTRA's AI assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-lg border border-border p-6 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-4 py-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-secondary text-foreground'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me about threats, incidents, or security best practices..."
          className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send
        </button>
      </div>
    </div>
  )
}
