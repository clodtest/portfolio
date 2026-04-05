import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { SYSTEM_PROMPT } from '@/lib/prompt'

// Use Node.js runtime — AI SDK v4 + Groq has issues with edge runtime
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const useGroq = !!process.env.GROQ_API_KEY

    const model = useGroq
      ? createGroq({ apiKey: process.env.GROQ_API_KEY! })('llama-3.3-70b-versatile')
      : createOpenAI({ apiKey: process.env.OPENAI_API_KEY! })('gpt-4o-mini')

    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages,
      maxTokens: 900,
      temperature: 0.72,
    })

    return result.toDataStreamResponse()
  } catch (err) {
    console.error('[chat/route]', err)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response. Check your API key.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
