import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Editor from "@monaco-editor/react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import { CopyButton } from "@/components/CopyButton";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");

  // Check initial auth state
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsAuthenticated(!!session);
  });

  // Subscribe to auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    setIsAuthenticated(!!session);
  });

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

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code }
      });

      if (error) throw error;

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

  // Custom renderer for code blocks
  const renderers = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      
      if (inline) {
        return <code className={className} {...props}>{children}</code>;
      }

      return (
        <div className="relative">
          <pre className={`${className} rounded-lg p-4`} {...props}>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
          <CopyButton text={codeString} />
        </div>
      );
    }
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
            </p>
          </div>
          
          <div className="space-y-6 animate-fade-in-up">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur"></div>
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-border/50 bg-card shadow-xl">
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-light"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: isAnalyzing,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>
            
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
              <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-border/50 relative">
                <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown components={renderers}>{analysis}</ReactMarkdown>
                </div>
                <CopyButton text={analysis} />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
