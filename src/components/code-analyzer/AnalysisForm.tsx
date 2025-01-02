import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CodeEditorSection } from "./CodeEditorSection";
import { AnalysisResults } from "./AnalysisResults";
import { handleAnalysis } from "./AnalysisHandler";

export function AnalysisForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysisResult = await handleAnalysis(code);
      setAnalysis(analysisResult);
      toast({
        title: "Analysis Complete",
        description: "Your code has been analyzed successfully",
      });
    } catch (error: any) {
      console.error('Error analyzing code:', error);
      
      if (error.message === 'Authentication required') {
        toast({
          title: "Authentication Required",
          description: "Please sign in to analyze code",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      if (error.message === 'Free tier limit reached') {
        toast({
          title: "Free Tier Limit Reached",
          description: "Please upgrade to Pro or Plus to continue analyzing code",
          variant: "destructive",
        });
        navigate("/pricing");
        return;
      }

      if (error.message === 'Pro tier limit reached') {
        toast({
          title: "Pro Tier Limit Reached",
          description: "Please upgrade to Plus for unlimited analyses",
          variant: "destructive",
        });
        navigate("/pricing");
        return;
      }

      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setAnalysis("");
    toast({
      title: "Cleared",
      description: "Input and analysis have been cleared",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <CodeEditorSection
        code={code}
        isAnalyzing={isAnalyzing}
        onCodeChange={(value) => setCode(value || "")}
        onClear={handleClear}
      />
      
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="relative px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            "Analyze Code"
          )}
        </Button>
      </div>

      <AnalysisResults analysis={analysis} />
    </div>
  );
}