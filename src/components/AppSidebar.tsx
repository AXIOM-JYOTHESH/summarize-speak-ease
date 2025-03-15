
import React from "react";
import { 
  Plus, 
  History, 
  Settings, 
  SlidersHorizontal, 
  AlignLeft 
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar
} from "@/components/ui/sidebar";
import { useSummary } from "@/contexts/SummaryContext";

export function AppSidebar() {
  const { 
    summaries, 
    clearSummaries, 
    currentSummaryId, 
    setCurrentSummaryId,
    customSettings,
    updateCustomSettings
  } = useSummary();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const handleNewChat = () => {
    setCurrentSummaryId(null);
    toast.success("Started a new summary");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Plus size={20} />
          <Button 
            variant="ghost" 
            className="w-full justify-start text-base" 
            onClick={handleNewChat}
          >
            New Summary
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="cursor-pointer hover:text-primary">
                <Settings className="mr-2" size={16} />
                Settings & Customization
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent className="px-3 py-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={16} />
                      <Label>Summary Length ({customSettings.wordCount} words)</Label>
                    </div>
                    <Slider
                      defaultValue={[customSettings.wordCount]}
                      min={50}
                      max={500}
                      step={10}
                      onValueChange={(value) => updateCustomSettings({ wordCount: value[0] })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlignLeft size={16} />
                      <Label>Tone Selection</Label>
                    </div>
                    <RadioGroup 
                      value={customSettings.tone}
                      onValueChange={(value) => updateCustomSettings({ 
                        tone: value as "formal" | "casual" | "neutral"
                      })}
                      className="flex gap-3"
                    >
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="formal" id="formal" />
                        <Label htmlFor="formal">Formal</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="casual" id="casual" />
                        <Label htmlFor="casual">Casual</Label>
                      </div>
                      <div className="flex items-center space-x-1">
                        <RadioGroupItem value="neutral" id="neutral" />
                        <Label htmlFor="neutral">Neutral</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>
            <History className="mr-2" size={16} />
            Chat History
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-280px)]">
              <SidebarMenu>
                {summaries.length > 0 ? (
                  summaries.map((summary) => (
                    <SidebarMenuItem key={summary.id}>
                      <SidebarMenuButton
                        isActive={currentSummaryId === summary.id}
                        onClick={() => setCurrentSummaryId(summary.id)}
                        tooltip={summary.title}
                      >
                        <div className="flex flex-col overflow-hidden w-full">
                          <span className="font-medium truncate">{summary.title}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(summary.date, "MMM d, yyyy • h:mm a")}
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    No history yet. Start by creating a new summary.
                  </div>
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {summaries.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={() => {
              if (confirm("Are you sure you want to clear all history?")) {
                clearSummaries();
                toast.success("History cleared");
              }
            }}
          >
            Clear History
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
