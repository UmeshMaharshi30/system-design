"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon, Sparkles, User, Bot } from "lucide-react";
import { MermaidRenderer } from "./MermaidRenderer";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Welcome, Architect. I am your Sensei. We are here to bridge the gap from Senior to Staff.\n\nWhich architectural domain shall we challenge today? Or shall I baseline your skills with a **Surprise Mock Interview**?" 
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user" as const, content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    // Simulate AI deep thought
    setTimeout(() => {
      let aiResponse = "";
      if (input.toLowerCase().includes("surprise") || input.toLowerCase().includes("baseline")) {
        aiResponse = "**Challenge Accepted.**\n\nDesign a **Global Distributed Rate Limiter** for a high-traffic API (e.g., Stripe).\n\n**Phase 1: Functional Requirements & BotE.**\nWhat metrics define our success? What is the expected request volume?\n\n```mermaid\ngraph LR\n  Client[Global Client] -- API Call --> LB[Edge Load Balancer]\n  LB --> RL{Rate Limiter}\n  RL -- Allowed --> API[Backend API]\n  RL -- Denied --> Error[429 Too Many Requests]\n  RL <--> Cache[(Distributed Redis Cluster)]\n```";
      } else {
        aiResponse = "Acknowledged. Let's dive deep into that specific component. How do you propose we handle data consistency across geographical regions for this use case?";
      }
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
    }, 1200);
  };

  const renderPart = (part: string, index: number) => {
    if (part.includes("```mermaid")) {
      const [text, remainder] = part.split("```mermaid");
      const [chart, ...afterwards] = remainder.split("```");
      return (
        <div key={index}>
          {text && <p className="whitespace-pre-wrap leading-relaxed">{text}</p>}
          <MermaidRenderer chart={chart.trim()} />
          {afterwards.join("").trim() && <p className="whitespace-pre-wrap leading-relaxed">{afterwards.join("")}</p>}
        </div>
      );
    }
    return <p key={index} className="whitespace-pre-wrap leading-relaxed">{part}</p>;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-transparent to-background/20 relative">
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="max-w-3xl mx-auto space-y-8 pb-32">
          <AnimatePresence mode="popLayout">
            {messages.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${m.role === 'user' ? 'bg-primary/20 border-primary/30' : 'bg-muted border-muted-foreground/20'}`}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary" />}
                </div>
                <div className={`p-5 rounded-2xl max-w-[85%] relative ${m.role === 'user' ? 'bg-primary text-primary-foreground shadow-indigo-500/10 shadow-xl' : 'bg-card/50 backdrop-blur-sm border shadow-sm'}`}>
                  {m.role === 'assistant' && <div className="absolute -top-1 -right-1"><Sparkles className="w-4 h-4 text-primary animate-pulse" /></div>}
                  <div className="prose prose-sm prose-invert max-w-none">
                    {/* Basic splitting logic for mermaid - simplified for this component */}
                    {m.content.includes("```mermaid") ? renderPart(m.content, i) : <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      
      <div className="absolute bottom-6 left-0 right-0 px-6">
        <div className="max-w-3xl mx-auto flex gap-3 items-center glass p-3 rounded-2xl border-white/5 shadow-2xl transition-all focus-within:border-primary/50 focus-within:shadow-primary/5">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Propose your architecture..." 
            className="border-none bg-transparent focus-visible:ring-0 text-sm py-6"
          />
          <Button 
            className="rounded-xl h-12 w-12 flex-shrink-0 accent-gradient hover:opacity-90 shadow-lg"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
