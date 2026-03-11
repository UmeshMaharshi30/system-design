"use client";

import { motion } from "framer-motion";
import { Database, Zap, Binary, ShieldCheck, Cpu, ChevronRight } from "lucide-react";

export function KnowledgeGraph() {
  const topics = [
    { 
      title: "Database Internals", 
      icon: <Database className="w-4 h-4" />, 
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      items: ["LSM Trees vs B-Trees", "Sharding Logic", "Consistency Models"] 
    },
    { 
      title: "Modern Foundations", 
      icon: <Zap className="w-4 h-4" />, 
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      items: ["Write-Heavy Systems", "Concurrency Control", "Distributed Transactions"] 
    },
    { 
      title: "AI Frontier", 
      icon: <Cpu className="w-4 h-4" />, 
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      items: ["Transformers", "Vector Databases", "Scaling Inference"] 
    },
    { 
      title: "Reliability & Ops", 
      icon: <ShieldCheck className="w-4 h-4" />, 
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      items: ["Observability", "SLOs/SLIs", "Circuit Breakers"] 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Core Curriculum
        </h3>
      </div>
      
      {topics.map((topic, idx) => (
        <motion.div 
          key={topic.title}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-xl ${topic.bg} ${topic.color} border border-white/5 transition-transform group-hover:scale-110`}>
              {topic.icon}
            </div>
            <span className="font-bold text-sm tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
              {topic.title}
            </span>
          </div>
          <ul className="pl-11 space-y-2 border-l border-white/5 ml-4">
            {topic.items.map((item) => (
              <li 
                key={item} 
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-2 transition-all hover:translate-x-1"
              >
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
