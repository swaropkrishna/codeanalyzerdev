import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const NoteInput = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      // For now, we'll just store the original text
      // Later we'll add the actual summarization logic
      const { error } = await supabase.from("Notes").insert({
        original_text: text,
        summary_text: "Summary coming soon...", // Placeholder
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Note saved successfully",
      });
      setText("");
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your meeting notes here..."
        className="min-h-[200px] p-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleSummarize}
          disabled={isLoading}
          className="bg-[#10B981] hover:bg-[#059669] text-white"
        >
          {isLoading ? "Processing..." : "Summarize"}
        </Button>
      </div>
    </div>
  );
};