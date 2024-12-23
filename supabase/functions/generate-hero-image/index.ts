import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  try {
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
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})