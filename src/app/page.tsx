"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoteCalculator } from "@/components/engine-room/BoteCalculator";
import { MermaidRenderer } from "@/components/architect-canvas/MermaidRenderer";
import { KnowledgeGraph } from "@/components/knowledge-graph/KnowledgeGraph";
import { ChatInterface } from "@/components/architect-canvas/ChatInterface";

export default function StudioPage() {
  return (
    <main className="h-screen w-full bg-background overflow-hidden">
      <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
        {/* Left Pane: Knowledge Graph */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
          <div className="h-full flex flex-col">
            <header className="p-4 border-b">
              <h1 className="text-lg font-bold tracking-tight">Knowledge Graph</h1>
            </header>
            <ScrollArea className="flex-1 p-4">
              <KnowledgeGraph />
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Pane: Architect's Canvas */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            <header className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Architect's Canvas</h2>
              <Tabs defaultValue="chat" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="diagram">Diagram</TabsTrigger>
                </TabsList>
              </Tabs>
            </header>
            <div className="flex-1 relative overflow-hidden flex flex-col">
              <ChatInterface />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Pane: Engine Room */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40} className="border-l">
          <div className="h-full flex flex-col">
            <header className="p-4 border-b">
              <h3 className="text-lg font-semibold">Engine Room</h3>
            </header>
            <ScrollArea className="flex-1 p-4">
              <BoteCalculator />
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
