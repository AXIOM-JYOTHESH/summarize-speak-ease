
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { TextInput } from "@/components/TextInput";
import { OptionsPanel, SummaryOptions } from "@/components/OptionsPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SummaryProvider, useSummary } from "@/contexts/SummaryContext";

const IndexContent = () => {
  const { toast } = useToast();
  const { currentSummaryId, summaries, addSummary, customSettings } = useSummary();
  const [originalText, setOriginalText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<SummaryOptions>({
    model: "gpt-3.5",
    length: "medium",
    audience: "general",
    language: "english",
    voice: "alloy",
  });

  // Load summary from history if currentSummaryId changes
  useEffect(() => {
    if (currentSummaryId) {
      const currentSummary = summaries.find(s => s.id === currentSummaryId);
      if (currentSummary) {
        setOriginalText(currentSummary.originalText);
        setSummary(currentSummary.summary);
      }
    } else {
      // Clear for new summary
      setOriginalText("");
      setSummary("");
    }
  }, [currentSummaryId, summaries]);

  const handleFileSelect = async (file: File) => {
    try {
      // Mock text extraction
      setLoading(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      let text = "";
      if (file.type === "text/plain") {
        text = await file.text();
      } else {
        // Mock text extraction from PDF/Word
        text = `This is extracted text from ${file.name}. In a real implementation, we would use OCR or document parsing libraries to extract the actual text content from the uploaded document. This is just a placeholder to demonstrate the UI flow.`;
      }
      
      setOriginalText(text);
      generateSummary(text);
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleTextSubmit = (text: string) => {
    setOriginalText(text);
    generateSummary(text);
  };

  const generateSummary = async (text: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Incorporate custom settings
      const wordCount = customSettings.wordCount;
      const tone = customSettings.tone;
      
      // Mock summary generation with custom settings
      const words = text.split(" ");
      let tonePrefix = "";
      
      switch (tone) {
        case "formal":
          tonePrefix = "In formal terms, ";
          break;
        case "casual":
          tonePrefix = "Simply put, ";
          break;
        default:
          tonePrefix = "";
      }
      
      let mockSummary = "";
      if (words.length <= 20) {
        mockSummary = text;
      } else {
        // Adjust summary based on word count
        const targetLength = Math.min(words.length, wordCount);
        const sampleWords = words.slice(0, targetLength);
        mockSummary = tonePrefix + sampleWords.join(" ");
      }
      
      setSummary(mockSummary);
      
      // Add to history if this is a new summary (not viewing history)
      if (!currentSummaryId) {
        const title = text.split(" ").slice(0, 5).join(" ") + "...";
        addSummary({
          originalText: text,
          summary: mockSummary,
          title
        });
      }
      
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOptionsChange = (newOptions: Partial<SummaryOptions>) => {
    setOptions({ ...options, ...newOptions });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 container py-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Text Summarization</h1>
            <SidebarTrigger className="md:hidden" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <OptionsPanel options={options} onOptionsChange={handleOptionsChange} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <div className="space-y-6">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upload">Upload File</TabsTrigger>
                    <TabsTrigger value="text">Enter Text</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-0">
                    <FileUpload onFileSelect={handleFileSelect} />
                  </TabsContent>
                  <TabsContent value="text" className="mt-0">
                    <TextInput onTextSubmit={handleTextSubmit} />
                  </TabsContent>
                </Tabs>

                <ResultPanel
                  originalText={originalText}
                  summary={summary}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const Index = () => (
  <SummaryProvider>
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset>
          <IndexContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  </SummaryProvider>
);

export default Index;
