
import React, { useCallback, useState } from "react";
import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        handleFile(file);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        handleFile(file);
      }
    },
    [onFileSelect]
  );

  const handleFile = (file: File) => {
    if (
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "text/plain"
    ) {
      setFileName(file.name);
      onFileSelect(file);
    } else {
      alert("Please upload a PDF, Word document, or text file.");
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div
          className={`file-drop-area ${isDragging ? "active" : ""} cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            className="file-input"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            {fileName ? (
              <>
                <FileText className="h-8 w-8 text-primary" />
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  Click or drag to change file
                </p>
              </>
            ) : (
              <>
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">Upload a file</p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to upload PDF, Word, or text files
                </p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
