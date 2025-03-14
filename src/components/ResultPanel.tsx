
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Download, Headphones } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ResultPanelProps {
  originalText: string;
  summary: string;
  loading: boolean;
}

export function ResultPanel({ originalText, summary, loading }: ResultPanelProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    // Mock TTS functionality
    setIsPlaying(true);
    
    // Simulate audio playback ending after 3 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const handleDownloadSummary = () => {
    if (!summary) return;
    
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAudio = () => {
    // Mock download audio functionality
    alert("Audio download would happen here (mock)");
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Results</span>
          {summary && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayAudio}
                disabled={isPlaying || loading}
              >
                {isPlaying ? (
                  <Headphones className="mr-2 h-4 w-4 animate-pulse" />
                ) : (
                  <Play className="mr-2 h-4 w-4" />
                )}
                {isPlaying ? "Playing..." : "Play Summary"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadSummary}
                disabled={loading}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAudio}
                disabled={loading}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Audio
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-4 w-4/5 rounded bg-muted animate-pulse mb-2"></div>
            <div className="h-4 w-3/5 rounded bg-muted animate-pulse mb-2"></div>
            <div className="h-4 w-4/5 rounded bg-muted animate-pulse"></div>
          </div>
        ) : originalText ? (
          <Tabs defaultValue="summary">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="sidebyside">Side by Side</TabsTrigger>
              <TabsTrigger value="original">Original Text</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="mt-0">
              <div className="rounded-md bg-muted/50 p-4 text-left">
                {summary || "Summary will appear here..."}
              </div>
            </TabsContent>
            <TabsContent value="sidebyside" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Original Text</h3>
                  <div className="rounded-md bg-muted/50 p-4 text-left text-sm max-h-96 overflow-y-auto">
                    {originalText}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Summary</h3>
                  <div className="rounded-md bg-muted/50 p-4 text-left text-sm max-h-96 overflow-y-auto">
                    {summary || "Summary will appear here..."}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="original" className="mt-0">
              <div className="rounded-md bg-muted/50 p-4 text-left max-h-96 overflow-y-auto">
                {originalText}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
            <p>Upload a file or enter text to see results</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
