
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export interface SummaryOptions {
  model: string;
  length: string;
  audience: string;
  language: string;
  voice: string;
}

interface OptionsPanelProps {
  options: SummaryOptions;
  onOptionsChange: (options: Partial<SummaryOptions>) => void;
}

export function OptionsPanel({ options, onOptionsChange }: OptionsPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Summarization Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select 
            value={options.model} 
            onValueChange={(value) => onOptionsChange({ model: value })}
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">OpenAI GPT-4</SelectItem>
              <SelectItem value="gpt-3.5">OpenAI GPT-3.5</SelectItem>
              <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
              <SelectItem value="mixtral">Mixtral</SelectItem>
              <SelectItem value="llama-2">LLaMA 2</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="length">Summary Length</Label>
          <Select 
            value={options.length} 
            onValueChange={(value) => onOptionsChange({ length: value })}
          >
            <SelectTrigger id="length">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience">Target Audience</Label>
          <Select 
            value={options.audience} 
            onValueChange={(value) => onOptionsChange({ audience: value })}
          >
            <SelectTrigger id="audience">
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
              <SelectItem value="researchers">Researchers</SelectItem>
              <SelectItem value="professionals">Professionals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select 
            value={options.language} 
            onValueChange={(value) => onOptionsChange({ language: value })}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voice">TTS Voice</Label>
          <Select 
            value={options.voice} 
            onValueChange={(value) => onOptionsChange({ voice: value })}
          >
            <SelectTrigger id="voice">
              <SelectValue placeholder="Select voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alloy">Alloy</SelectItem>
              <SelectItem value="echo">Echo</SelectItem>
              <SelectItem value="fable">Fable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
