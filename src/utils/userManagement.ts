import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export async function ensureUserExists(userId: string) {
  console.log('Checking user record for:', userId);
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (userError) {
    console.error('Error fetching user:', userError);
    throw userError;
  }

  if (!userData) {
    console.log('Creating user record for:', userId);
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{ 
        id: userId,
        subscription_tier: 'free',
        analysis_count: 0,
        max_analysis_count: 1
      }])
      .select()
      .maybeSingle();

    if (createError) {
      console.error('Error creating user record:', createError);
      throw createError;
    }

    if (!newUser) {
      throw new Error('Failed to create user record');
    }

    return newUser;
  }

  return userData;
}

export async function updateAnalysisCount(userId: string) {
  console.log('Updating analysis count for user:', userId);
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ analysis_count: undefined }) // Trigger the check_analysis_limits function
    .eq('id', userId)
    .select()
    .maybeSingle();

  if (updateError) {
    console.error('Error updating analysis count:', updateError);
    if (updateError.message.includes('Free tier limit reached')) {
      throw new Error('Free tier limit reached');
    } else if (updateError.message.includes('Pro tier limit reached')) {
      throw new Error('Pro tier limit reached');
    }
    throw updateError;
  }

  if (!updatedUser) {
    throw new Error('Updated user record not found');
  }

  return updatedUser;
}