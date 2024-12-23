import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting image generation...");
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: "Create a modern, minimalist illustration of a meeting notes summarizer tool. Show a clean interface with text being transformed into a concise summary. Use soft purple (#9b87f5) as the primary color, with white and light gray backgrounds. Include subtle animations suggesting the summarization process. The style should be professional and tech-focused, perfect for a SaaS product.",
        n: 1,
        size: "1024x1024"
      })
    })

    const data = await response.json()
    console.log("Image generation response:", data);
    
    if (data.error) {
      console.error("OpenAI API error:", data.error);
      throw new Error(data.error.message);
    }
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error("Error in generate-hero-image function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})