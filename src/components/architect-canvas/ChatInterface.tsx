"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { MermaidRenderer } from "./MermaidRenderer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome to your Staff-level System Design interview. I am your Sensei. Which topic shall we baseline first?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // In a real app, we'd call an API here.
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Understood. Let's start with a surprise baseline. **Design a Global Distributed Job Scheduler.**\n\nPhase 1: Requirements & BotE. Go ahead.\n\n```mermaid\ngraph TD\n  Client[Client Application] --> API[API Gateway]\n  API --> JS[Job Scheduler Service]\n  JS --> DB[(Job Database)]\n```" 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-muted/20">
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-2xl mx-auto space-y-6 pb-24">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[85%] ${m.role === 'user' ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-card border shadow-sm'}`}>
                <div className="prose prose-sm dark:prose-invert">
                  {m.content.split('```mermaid').map((part, index) => {
                    if (index === 0) return <p key={index} className="whitespace-pre-wrap">{part}</p>;
                    const [chart, ...rest] = part.split('```');
                    return (
                      <div key={index} className="my-4">
                        <MermaidRenderer chart={chart.trim()} />
                        {rest.map((r, ri) => <p key={ri} className="whitespace-pre-wrap">{r}</p>)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
        <div className="max-w-2xl mx-auto flex gap-2 item-center bg-card border p-2 rounded-xl shadow-2xl">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your design proposal..." 
            className="border-none focus-visible:ring-0"
          />
          <Button size="icon" onClick={handleSend}>
            <SendIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
