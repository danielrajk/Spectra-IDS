'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I\'m your SPECTRA-IDS research assistant. I can help you analyze results, understand model behavior, and answer questions about your experiments. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, role: 'user', content: input },
        { id: messages.length + 2, role: 'assistant', content: 'I\'m analyzing your query and the experimental data. Based on your latest results, the CNN-BiLSTM model shows the best performance with 99.2% accuracy on CICIDS2017 dataset. Would you like me to elaborate on any specific aspect?' }
      ]);
      setInput('');
    }
  };

  return (
    <div className="p-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Research Assistant</h1>
        <p className="text-muted-foreground">AI-powered analysis and insights</p>
      </div>

      <div className="flex-1 bg-card border border-border rounded-lg p-6 overflow-y-auto mb-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-4 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about your experiments..."
          className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
        />
        <button
          onClick={handleSend}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
