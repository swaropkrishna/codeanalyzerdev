import { supabase } from "@/integrations/supabase/client";

export async function ensureUserExists(userId: string) {
  console.log('Checking user record for:', userId);
  
  try {
    // First try to get the existing user
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching user:', fetchError);
      throw fetchError;
    }

    // If user exists, return it
    if (existingUser) {
      console.log('Found existing user:', existingUser);
      return existingUser;
    }

    console.log('No user found, creating new user record for:', userId);
    
    // If user doesn't exist, create a new record
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([{ 
        id: userId,
        subscription_tier: 'free',
        analysis_count: 0,
        daily_analysis_count: 0,
        max_analysis_count: 1
      }])
      .select()
      .single();

    if (createError) {
      console.error('Error creating user record:', createError);
      throw createError;
    }

    console.log('Successfully created new user:', newUser);
    return newUser;

  } catch (error) {
    console.error('Error in ensureUserExists:', error);
    throw error;
  }
}

export async function updateAnalysisCount(userId: string) {
  console.log('Updating analysis count for user:', userId);
  
  try {
    // First ensure user exists
    const user = await ensureUserExists(userId);
    console.log('Confirmed user exists:', user);
    
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ 
        analysis_count: user.analysis_count + 1,
        daily_analysis_count: (user.daily_analysis_count || 0) + 1,
        last_analysis_date: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error('Error updating analysis count:', updateError);
      
      // Check for specific error messages from the database function
      if (updateError.message.includes('Free tier limit reached')) {
        throw new Error('Free tier limit reached');
      } else if (updateError.message.includes('Pro tier limit reached')) {
        throw new Error('Pro tier limit reached');
      }
      
      throw updateError;
    }

    if (!updatedUser) {
      console.error('Updated user record not found');
      throw new Error('Updated user record not found');
    }

    console.log('Successfully updated analysis count for user:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Error in updateAnalysisCount:', error);
    throw error;
  }
}