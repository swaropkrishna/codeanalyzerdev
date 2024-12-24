import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SummaryCard } from "./SummaryCard";

export const NoteInput = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to summarize",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the Edge Function to get the summary
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/summarize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const { summary: generatedSummary } = await response.json();

      // Save to Supabase
      const { error } = await supabase.from("Notes").insert({
        original_text: text,
        summary_text: generatedSummary,
      });

      if (error) throw error;

      setSummary(generatedSummary);
      toast({
        title: "Success",
        description: "Note summarized and saved successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to summarize note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Textarea
          placeholder="Paste your meeting notes here..."
          className="min-h-[200px] p-4 bg-card border-secondary text-foreground placeholder:text-muted-foreground resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-center">
          <Button
            onClick={handleSummarize}
            disabled={isLoading}
            className="bg-cta hover:bg-cta-hover text-white px-8 py-2 rounded-md transition-colors duration-200"
          >
            {isLoading ? "Processing..." : "Summarize"}
          </Button>
        </div>
      </div>
      {summary && <SummaryCard summary={summary} />}
    </div>
  );
};