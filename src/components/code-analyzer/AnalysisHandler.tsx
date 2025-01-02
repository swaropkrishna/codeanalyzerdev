import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ensureUserExists, updateAnalysisCount } from "@/utils/userManagement";

export async function handleAnalysis(code: string) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Authentication required');
  }

  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id;

  if (!userId) {
    throw new Error('User not found');
  }

  // Ensure user exists in database
  await ensureUserExists(userId);
  
  // Update analysis count
  await updateAnalysisCount(userId);

  // Analyze code
  console.log('Invoking analyze-code function');
  const { data, error } = await supabase.functions.invoke('analyze-code', {
    body: { code }
  });

  if (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }

  if (!data?.analysis) {
    throw new Error('No analysis data received');
  }

  return data.analysis;
}