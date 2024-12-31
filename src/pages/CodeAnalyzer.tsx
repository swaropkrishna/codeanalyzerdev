import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";
import { useUserStatus } from "@/hooks/use-user-status";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isPro, isLoading } = useUserStatus();
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleClear = () => {
    setCode("");
    setAnalysis("");
    toast({
      title: "Cleared",
      description: "Input and analysis have been cleared.",
    });
  };

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      navigate("/auth?view=sign_in");
      return;
    }

    if (!isPro && analysisCount >= 5) {
      toast({
        title: "Free limit reached",
        description: "Please upgrade to Pro to continue analyzing code.",
        variant: "destructive",
      });
      navigate("/pricing");
      return;
    }

    if (!code.trim()) {
      toast({
        title: "No code to analyze",
        description: "Please enter some code first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code },
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      setAnalysisCount(prev => prev + 1);

      if (!isPro) {
        const remainingAnalyses = 5 - (analysisCount + 1);
        toast({
          title: "Analysis complete",
          description: `You have ${remainingAnalyses} free analyses remaining.`,
        });
      }
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast({
        title: "Error analyzing code",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="relative">
        {code && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
        <Editor
          height="400px"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing || (!code.trim())}
          className="w-full md:w-auto"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Code"}
        </Button>
        {!isPro && (
          <span className="text-sm text-muted-foreground">
            {5 - analysisCount} analyses remaining
          </span>
        )}
      </div>

      {analysis && (
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: analysis }} />
        </div>
      )}
    </div>
  );
}