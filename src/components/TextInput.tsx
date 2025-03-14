
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TextInputProps {
  onTextSubmit: (text: string) => void;
}

export function TextInput({ onTextSubmit }: TextInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <Textarea
            placeholder="Paste or type your text here..."
            className="min-h-[200px] resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!text.trim()}
          >
            Summarize Text
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
