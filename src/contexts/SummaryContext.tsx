
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface SummaryItem {
  id: string;
  originalText: string;
  summary: string;
  date: Date;
  title: string;
}

export interface SummaryContextType {
  summaries: SummaryItem[];
  addSummary: (summary: Omit<SummaryItem, "id" | "date">) => void;
  clearSummaries: () => void;
  currentSummaryId: string | null;
  setCurrentSummaryId: (id: string | null) => void;
  customSettings: {
    wordCount: number;
    tone: "formal" | "casual" | "neutral";
  };
  updateCustomSettings: (settings: Partial<SummaryContextType["customSettings"]>) => void;
}

const SummaryContext = createContext<SummaryContextType | undefined>(undefined);

export const SummaryProvider = ({ children }: { children: ReactNode }) => {
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [currentSummaryId, setCurrentSummaryId] = useState<string | null>(null);
  const [customSettings, setCustomSettings] = useState({
    wordCount: 200,
    tone: "neutral" as const,
  });

  const addSummary = (summaryData: Omit<SummaryItem, "id" | "date">) => {
    const newSummary = {
      ...summaryData,
      id: Date.now().toString(),
      date: new Date(),
    };
    setSummaries((prev) => [newSummary, ...prev]);
    setCurrentSummaryId(newSummary.id);
  };

  const clearSummaries = () => {
    setSummaries([]);
    setCurrentSummaryId(null);
  };

  const updateCustomSettings = (settings: Partial<typeof customSettings>) => {
    setCustomSettings((prev) => ({ ...prev, ...settings }));
  };

  return (
    <SummaryContext.Provider
      value={{
        summaries,
        addSummary,
        clearSummaries,
        currentSummaryId,
        setCurrentSummaryId,
        customSettings,
        updateCustomSettings,
      }}
    >
      {children}
    </SummaryContext.Provider>
  );
};

export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error("useSummary must be used within a SummaryProvider");
  }
  return context;
};
