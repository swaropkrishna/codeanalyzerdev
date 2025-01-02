import { supabase } from "@/integrations/supabase/client";

export async function ensureUserExists(userId: string) {
  console.log('Checking user record for:', userId);
  
  // First try to get the existing user
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
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
      max_analysis_count: 1
    }])
    .select()
    .maybeSingle();

  if (createError) {
    console.error('Error creating user record:', createError);
    throw createError;
  }

  if (!newUser) {
    console.error('Failed to create user record - no data returned');
    throw new Error('Failed to create user record');
  }

  console.log('Successfully created new user:', newUser);
  return newUser;
}

export async function updateAnalysisCount(userId: string) {
  console.log('Updating analysis count for user:', userId);
  
  // First ensure user exists
  await ensureUserExists(userId);
  
  const { data: updatedUser, error: updateError } = await supabase
    .from('users')
    .update({ analysis_count: undefined }) // This triggers the check_analysis_limits function
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
}