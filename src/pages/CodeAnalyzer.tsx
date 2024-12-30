import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Wand2 } from "lucide-react";

export default function CodeAnalyzer() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const analyzeCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {!isAuthenticated ? (
          // Hero Section for unauthenticated users
          <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16 pb-24">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6 animate-fade-in">
                  Instantly Analyze and Fix Code Errors in Any Language
                </h1>
                <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up">
                  Submit your code and receive detailed error analyses and corrections within seconds. 
                  Powered by advanced AI to help you write better code.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Code Analysis Form - Always visible but with different styling based on auth status */}
        <div className={`container mx-auto px-4 ${!isAuthenticated ? '' : 'pt-16'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label htmlFor="code" className="block text-sm font-medium">
                  Enter your code:
                </label>
                <textarea
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[calc(100vh-400px)] p-4 border rounded-md font-mono bg-card/50 backdrop-blur-sm text-sm resize-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Paste your code here..."
                />
              </div>
              
              <Button 
                onClick={analyzeCode} 
                className="w-full group"
                disabled={isLoading}
              >
                <Wand2 className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                {isLoading ? "Analyzing..." : "Analyze Code"}
              </Button>
            </div>

            {analysis && (
              <div className="mt-0 lg:mt-8 bg-card rounded-lg shadow-lg overflow-auto h-[calc(100vh-400px)] animate-fade-in">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Analysis Result:</h2>
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        code({node, className, children, ...props}) {
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {analysis}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
        </div>
      </main>
      <Footer />
    </div>
  );
}