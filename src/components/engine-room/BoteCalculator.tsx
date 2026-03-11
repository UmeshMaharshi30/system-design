"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Zap, Database, HardDrive, Info, ArrowRightLeft } from "lucide-react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { motion, AnimatePresence } from "framer-motion";

export function BoteCalculator() {
  const [calculation, setCalculation] = useState("");
  const [qpsInput, setQpsInput] = useState("");
  const [qpsResult, setQpsResult] = useState<{ qps: number; peak: number } | null>(null);

  const calculateQPS = (val: string) => {
    setQpsInput(val);
    const num = parseFloat(val.replace(/,/g, ""));
    if (!isNaN(num)) {
      const avg = Math.round(num / 100000); // Staff shortcut: 1 day ~ 100k sec
      setQpsResult({
        qps: avg,
        peak: avg * 2, // Standard heuristic: Peak = 2x Avg
      });
    } else {
      setQpsResult(null);
    }
  };

  const presets = [
    { label: "100M DAU", value: "100000000" },
    { label: "1B Req/Day", value: "1000000000" },
    { label: "10TB Write/Day", value: "10000000" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Estimation Studio
        </h3>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Info className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold flex items-center gap-2 opacity-70">
              <Zap className="w-3 h-3 text-yellow-500" />
              STAFF SHORTCUTS
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <Button 
                key={p.label} 
                variant="secondary" 
                size="sm" 
                className="h-7 text-[10px] rounded-full px-3 transition-all hover:scale-105"
                onClick={() => calculateQPS(p.value)}
              >
                {p.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold opacity-70 flex items-center gap-2">
              <ArrowRightLeft className="w-3 h-3 text-primary" />
              THROUGHPUT CONVERTER
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="Total Requests / Day" 
                value={qpsInput}
                onChange={(e) => calculateQPS(e.target.value)}
                className="bg-background/20 border-white/5 focus-visible:ring-primary/50 text-sm font-mono"
              />
            </div>
            
            <AnimatePresence>
              {qpsResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="grid grid-cols-2 gap-2"
                >
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="text-[10px] uppercase font-bold text-primary/70 mb-1">Average</div>
                    <div className="text-xl font-bold font-mono">{qpsResult.qps.toLocaleString()} <small className="text-[10px] font-normal opacity-50">QPS</small></div>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-xl border border-accent/20">
                    <div className="text-[10px] uppercase font-bold text-accent/70 mb-1">Peak (2x)</div>
                    <div className="text-xl font-bold font-mono">{qpsResult.peak.toLocaleString()} <small className="text-[10px] font-normal opacity-50">QPS</small></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold opacity-70 flex items-center gap-2">
              <Database className="w-3 h-3 text-purple-500" />
              MATH SCRATCHPAD
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Enter LaTeX math logic..."
              value={calculation}
              onChange={(e) => setCalculation(e.target.value)}
              className="bg-background/20 border-white/5 min-h-[120px] text-sm font-mono placeholder:opacity-30"
            />
            {calculation && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-black/40 rounded-xl border border-white/5 overflow-x-auto"
              >
                <BlockMath math={calculation} />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
