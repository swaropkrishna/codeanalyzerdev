import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import { CopyButton } from "@/components/CopyButton";
import { CodeEditor } from "@/components/CodeEditor";
import { useUserStatus } from "@/hooks/use-user-status";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isPro, isLoading } = useUserStatus();
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [analysisCount, setAnalysisCount] = useState(0);

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to analyze code",
        variant: "destructive",
      });
      navigate("/auth?view=sign_in");
      return;
    }

    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    // Check if user has reached the free limit
    if (!isPro && analysisCount >= 5) {
      toast({
        title: "Free Limit Reached",
        description: "Please upgrade to Pro to continue analyzing code",
        variant: "destructive",
      });
      navigate("/pricing");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      setAnalysisCount(prev => prev + 1);
      toast({
        title: "Analysis Complete",
        description: "Your code has been analyzed successfully",
      });
    } catch (error) {
      console.error('Error analyzing code:', error);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Analyze Your Code with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant insights and suggestions to improve your code quality using advanced AI analysis.
              {!isPro && isAuthenticated && (
                <span className="block mt-2 text-sm">
                  {5 - analysisCount} analyses remaining in free tier
                </span>
              )}
            </p>
          </div>
          
          <div className="space-y-6 animate-fade-in-up">
            <CodeEditor
              code={code}
              onChange={(value) => setCode(value || "")}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
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

            {analysis && (
              <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-border/50">
                <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
                <div className="prose prose-sm max-w-none relative">
                  <CopyButton text={analysis} />
                  <ReactMarkdown>{analysis}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}