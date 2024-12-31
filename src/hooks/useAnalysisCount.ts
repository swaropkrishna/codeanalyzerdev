import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAnalysisCount() {
  const [analysisCount, setAnalysisCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalysisCount();
  }, []);

  const fetchAnalysisCount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('users')
        .select('analysis_count')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      setAnalysisCount(data?.analysis_count || 0);
    } catch (error) {
      console.error('Error fetching analysis count:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch analysis count",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const incrementAnalysisCount = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return false;

      const { error } = await supabase
        .from('users')
        .update({ analysis_count: analysisCount + 1 })
        .eq('id', session.user.id);

      if (error) throw error;
      
      setAnalysisCount(prev => prev + 1);
      return true;
    } catch (error) {
      console.error('Error incrementing analysis count:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update analysis count",
      });
      return false;
    }
  };

  return {
    analysisCount,
    incrementAnalysisCount,
    isLoading,
  };
}