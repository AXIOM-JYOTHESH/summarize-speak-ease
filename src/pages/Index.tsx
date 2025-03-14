
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUpload } from "@/components/FileUpload";
import { TextInput } from "@/components/TextInput";
import { OptionsPanel, SummaryOptions } from "@/components/OptionsPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
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
      
      // Mock summary generation
      const lengthFactor = options.length === "short" ? 0.1 : options.length === "medium" ? 0.3 : 0.5;
      const wordCount = Math.floor(text.split(" ").length * lengthFactor);
      const words = text.split(" ");
      
      let mockSummary = "";
      if (words.length <= 20) {
        mockSummary = text;
      } else {
        const startingWords = words.slice(0, Math.floor(wordCount * 0.3));
        const middleWords = words.slice(Math.floor(words.length * 0.4), Math.floor(words.length * 0.4) + Math.floor(wordCount * 0.4));
        const endingWords = words.slice(words.length - Math.floor(wordCount * 0.3));
        
        mockSummary = [...startingWords, ...middleWords, ...endingWords].join(" ");
      }
      
      setSummary(mockSummary);
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
      <main className="flex-1 container py-8">
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
      <Footer />
    </div>
  );
};

export default Index;
