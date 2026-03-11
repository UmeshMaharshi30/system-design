"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  chart: string;
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
  const [svg, setSvg] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
      fontFamily: "var(--font-sans)",
    });
  }, []);

  useEffect(() => {
    const renderChart = async () => {
      if (chart && containerRef.current) {
        try {
          const { svg } = await mermaid.render(
            `mermaid-${Math.random().toString(36).substr(2, 9)}`,
            chart
          );
          setSvg(svg);
        } catch (error) {
          console.error("Mermaid rendering failed:", error);
          setSvg('<div class="text-destructive p-4">Failed to render diagram. Check Mermaid syntax.</div>');
        }
      }
    };
    renderChart();
  }, [chart]);

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-4 bg-muted/30 rounded-lg"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
