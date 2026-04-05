import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createOpenAI } from '@ai-sdk/openai'
import { SYSTEM_PROMPT } from '@/lib/prompt'

export const dynamic = 'force-dynamic'
// Allow up to 30s on Vercel (covers Groq streaming on larger responses)
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'No API key configured. Add GROQ_API_KEY in Vercel environment variables.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[chat/route]', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
