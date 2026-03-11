"use client";

import { Card } from "@/components/ui/card";
import { Database, Zap, Binary, ShieldCheck, Cpu } from "lucide-react";

export function KnowledgeGraph() {
  const topics = [
    { title: "Database Internals", icon: <Database className="w-4 h-4" />, items: ["LSM Trees vs B-Trees", "Sharding Logic", "Consistency Models"] },
    { title: "Modern Foundations", icon: <Zap className="w-4 h-4" />, items: ["Write-Heavy Systems", "Concurrency Control", "Distributed Transactions"] },
    { title: "AI Frontier", icon: <Cpu className="w-4 h-4" />, items: ["Transformers", "Vector Databases", "RAG vs Fine-tuning"] },
    { title: "Reliability & Ops", icon: <ShieldCheck className="w-4 h-4" />, items: ["Observability", "SLOs/SLIs", "Cascading Failures"] },
  ];

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <Card key={topic.title} className="p-3 hover:bg-muted/50 cursor-pointer transition-colors border-none shadow-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-primary/10 rounded text-primary">
              {topic.icon}
            </div>
            <span className="font-semibold text-sm">{topic.title}</span>
          </div>
          <ul className="pl-8 space-y-1">
            {topic.items.map((item) => (
              <li key={item} className="text-xs text-muted-foreground hover:text-foreground">
                • {item}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}
