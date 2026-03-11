"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calculator, Zap, Database, HardDrive } from "lucide-react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export function BoteCalculator() {
  const [calculation, setCalculation] = useState("");
  const [qpsInput, setQpsInput] = useState("");
  const [qpsResult, setQpsResult] = useState<number | null>(null);

  const calculateQPS = (val: string) => {
    setQpsInput(val);
    const num = parseFloat(val.replace(/,/g, ""));
    if (!isNaN(num)) {
      // 1 day = 86400 seconds
      setQpsResult(Math.round(num / 86400));
    } else {
      setQpsResult(null);
    }
  };

  const presets = [
    { label: "1M DAU", icon: <Zap className="w-4 h-4 mr-2" />, value: "1000000" },
    { label: "100ms Latency", icon: <Database className="w-4 h-4 mr-2" />, value: "100ms" },
    { label: "10TB Storage", icon: <HardDrive className="w-4 h-4 mr-2" />, value: "10TB" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Calculator className="w-4 h-4 mr-2" />
            Quick Presets
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2">
          {presets.map((p) => (
            <Button 
              key={p.label} 
              variant="outline" 
              size="sm" 
              className="justify-start"
              onClick={() => {
                if (p.label === "1M DAU") calculateQPS(p.value);
              }}
            >
              {p.icon}
              {p.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">QPS Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Requests per Day</label>
            <Input 
              placeholder="e.g. 1,000,000" 
              value={qpsInput}
              onChange={(e) => calculateQPS(e.target.value)}
            />
          </div>
          {qpsResult !== null && (
            <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
              <span className="text-sm font-semibold">Result: </span>
              <span className="text-lg font-bold">{qpsResult.toLocaleString()} QPS</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Math Scratchpad (LaTeX)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="Type LaTeX here... e.g. \frac{10^6}{8.64 \times 10^4}"
            value={calculation}
            onChange={(e) => setCalculation(e.target.value)}
            className="font-mono text-sm min-h-[100px]"
          />
          {calculation && (
            <div className="p-4 bg-muted rounded-md overflow-x-auto">
              <BlockMath math={calculation} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
