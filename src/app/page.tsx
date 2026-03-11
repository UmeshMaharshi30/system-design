"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BoteCalculator } from "@/components/engine-room/BoteCalculator";
import { KnowledgeGraph } from "@/components/knowledge-graph/KnowledgeGraph";
import { ChatInterface } from "@/components/architect-canvas/ChatInterface";
import { Button } from "@/components/ui/button";
import { Settings, Menu, Github } from "lucide-react";

const ResizablePanelGroupAny = ResizablePanelGroup as any;
const ResizablePanelAny = ResizablePanel as any;
const ResizableHandleAny = ResizableHandle as any;

export default function StudioPage() {
  return (
    <main className="h-screen w-full bg-background overflow-hidden flex flex-col">
      {/* Premium Navbar */}
      <header className="h-14 border-b border-white/5 glass flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-2 rounded-lg">
            <span className="font-black text-xl tracking-tighter text-primary">SDS</span>
          </div>
          <h1 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground hidden md:block">
            System Design Sensei v1.0
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-xs gap-2">
            <Github className="w-4 h-4" />
            Repo
          </Button>
          <div className="h-4 w-[1px] bg-white/10" />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-widest bg-primary hover:bg-primary/90">
            Export Design
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroupAny direction="horizontal">
          {/* Left Pane: Knowledge Graph */}
          <ResizablePanelAny defaultSize={20} minSize={15} maxSize={25} className="bg-muted/10">
            <div className="h-full flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <KnowledgeGraph />
              </ScrollArea>
              <div className="p-4 border-t border-white/5 bg-background/40">
                <Button variant="outline" className="w-full justify-start text-xs border-white/5 glass shadow-none hover:bg-white/10">
                  <Menu className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </div>
          </ResizablePanelAny>

          <ResizableHandleAny className="w-[1px] bg-white/5 hover:bg-primary/20 transition-colors" />

          {/* Center Pane: Architect's Canvas */}
          <ResizablePanelAny defaultSize={55} minSize={40}>
            <ChatInterface />
          </ResizablePanelAny>

          <ResizableHandleAny className="w-[1px] bg-white/5 hover:bg-primary/20 transition-colors" />

          {/* Right Pane: Engine Room */}
          <ResizablePanelAny defaultSize={25} minSize={20} maxSize={35} className="bg-muted/10">
            <ScrollArea className="h-full p-6">
              <BoteCalculator />
            </ScrollArea>
          </ResizablePanelAny>
        </ResizablePanelGroupAny>
      </div>
    </main>
  );
}
