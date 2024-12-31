import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CodeEditor } from "@/components/code-analyzer/CodeEditor";
import { AnalysisResults } from "@/components/code-analyzer/AnalysisResults";
import { useAnalysisCount } from "@/hooks/useAnalysisCount";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const { analysisCount, incrementAnalysisCount, isLoading: isLoadingCount } = useAnalysisCount();

  useEffect(() => {
    // Check initial auth state immediately
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Initial session check in CodeAnalyzer:", session);
      
      if (session?.user) {
        setIsAuthenticated(true);
        const { data: userData } = await supabase
          .from('users')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();
        
        setIsPro(userData?.is_pro || false);
      } else {
        setIsAuthenticated(false);
        navigate("/auth?view=sign_in");
      }
    };
    
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed in CodeAnalyzer:", event, session);
      
      if (session?.user) {
        setIsAuthenticated(true);
        const { data: userData } = await supabase
          .from('users')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();
        
        setIsPro(userData?.is_pro || false);
      } else {
        setIsAuthenticated(false);
        navigate("/auth?view=sign_in");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAnalyze = async () => {
    console.log('Starting code analysis...', { isAuthenticated });
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to sign in...');
      toast({
        title: "Authentication Required",
        description: "Please sign in to analyze code",
        variant: "destructive",
      });
      navigate("/auth?view=sign_in");
      return;
    }

    if (!code.trim()) {
      console.log('No code provided');
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    if (!isPro && analysisCount >= 5) {
      console.log('Free limit reached');
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
      console.log('Calling analyze-code function...');
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code }
      });

      if (error) {
        console.error('Error from analyze-code function:', error);
        throw error;
      }

      console.log('Analysis completed, updating count...');
      const success = await incrementAnalysisCount();
      if (!success) {
        throw new Error("Failed to update analysis count");
      }

      setAnalysis(data.analysis);
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
              {!isPro && isAuthenticated && !isLoadingCount && (
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

            <AnalysisResults analysis={analysis} />
          </div>
        </div>
      </section>
    </main>
  );
}