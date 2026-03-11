"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";
import { Loader2 } from "lucide-react";

interface MermaidRendererProps {
  chart: string;
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
  const [svg, setSvg] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const id = useId().replace(/:/g, ""); // Ensure safe ID for Mermaid

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      look: "handDrawn", // Staff engineer "sketch" look
      securityLevel: "loose",
      fontFamily: "Inter, sans-serif",
      themeVariables: {
        primaryColor: "#5abfff",
        primaryTextColor: "#fff",
        primaryBorderColor: "#5abfff",
        lineColor: "#64748b",
        secondaryColor: "#1e293b",
        tertiaryColor: "#0f172a",
      },
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      setLoading(true);
      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (isMounted) setSvg(svg);
      } catch (error) {
        console.error("Mermaid rendering failed:", error);
        if (isMounted) setSvg('<div class="text-destructive/50 text-xs italic p-4">Syntax error in architecture diagram</div>');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    renderChart();
    return () => { isMounted = false; };
  }, [chart, id]);

  return (
    <div className="relative w-full min-h-[150px] flex items-center justify-center p-6 glass-card rounded-xl my-4 overflow-x-auto transition-all hover:border-primary/30">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-sm z-10">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
      <div 
        className="mermaid transition-opacity duration-300"
        style={{ opacity: loading ? 0 : 1 }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
