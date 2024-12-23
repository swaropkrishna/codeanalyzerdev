import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/dashboard/Navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function SummaryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      console.log("Fetching note with ID:", id);
      if (!id) throw new Error("No note ID provided");
      
      const { data, error } = await supabase
        .from("Notes")
        .select()
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching note:", error);
        throw error;
      }

      console.log("Fetched note:", data);
      return data;
    },
    enabled: !!id, // Only run query if we have an ID
  });

  const handleCopy = async () => {
    if (note?.summary_text) {
      await navigator.clipboard.writeText(note.summary_text);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard",
      });
    }
  };

  const handleDownload = () => {
    if (note?.summary_text) {
      const element = document.createElement("a");
      const file = new Blob([note.summary_text], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `summary-${id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center py-12">
            Loading summary...
          </div>
        </main>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Summary not found.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => navigate("/history")}
            >
              Back to History
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Panel */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Original Meeting Notes
                </h2>
              </div>
              <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                <p className="text-gray-600 whitespace-pre-wrap">
                  {note.original_text}
                </p>
              </ScrollArea>
            </div>

            {/* Right Panel */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">
                  AI-Generated Summary
                </h2>
              </div>
              <ScrollArea className="h-[500px] w-full rounded-md border p-4 mb-4">
                <p className="text-gray-600 whitespace-pre-wrap">
                  {note.summary_text}
                </p>
              </ScrollArea>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCopy}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Summary
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download as PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
