'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from '@phosphor-icons/react'
import dynamic from 'next/dynamic'
import Avatar from '@/components/Avatar'
import type { AvatarState } from '@/components/Avatar'
import ChatMessage from '@/components/ChatMessage'
import SuggestionChips from '@/components/SuggestionChips'
import ThemeToggle from '@/components/ThemeToggle'

// SSR-safe canvas component
const MouseGradient = dynamic(() => import('@/components/MouseGradient'), { ssr: false })

// ─── Typing indicator ────────────────────────────────────────
function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="flex items-end gap-3"
    >
      <div
        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
          C
        </span>
      </div>
      <div
        className="px-4 py-3.5 rounded-2xl rounded-bl-md"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div className="flex gap-1.5 items-center h-4">
          <div className="w-1.5 h-1.5 rounded-full dot-1" style={{ background: 'var(--muted)' }} />
          <div className="w-1.5 h-1.5 rounded-full dot-2" style={{ background: 'var(--muted)' }} />
          <div className="w-1.5 h-1.5 rounded-full dot-3" style={{ background: 'var(--muted)' }} />
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main page ───────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: '/api/chat',
  })

  const hasMessages = messages.length > 0
  const lastMsg = messages[messages.length - 1]
  const isThinking = isLoading && (!lastMsg || lastMsg.role === 'user')

  const avatarState: AvatarState = isLoading
    ? 'thinking'
    : lastMsg?.role === 'assistant'
    ? 'speaking'
    : 'idle'

  // ── Theme ──────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (saved) setTheme(saved)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      if (next === 'light') {
        document.documentElement.classList.add('light')
      } else {
        document.documentElement.classList.remove('light')
      }
      return next
    })
  }, [])

  // ── Auto-scroll ────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // ── Auto-focus input ───────────────────────────────────────
  useEffect(() => {
    if (!isLoading) inputRef.current?.focus()
  }, [isLoading])

  // ── Chip select ────────────────────────────────────────────
  const handleChipSelect = useCallback(
    (text: string) => {
      append({ role: 'user', content: text })
    },
    [append]
  )

  // ── Submit on Enter ────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim() && !isLoading) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  return (
    <main
      className="relative flex flex-col"
      style={{ height: '100dvh', background: 'var(--bg)', zIndex: 20 }}
    >
      {/* Mouse gradient + ripple effect */}
      <MouseGradient />

      {/* Theme toggle */}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* ── Compact header (visible once messages start) ── */}
      <AnimatePresence>
        {hasMessages && (
          <motion.header
            key="compact-header"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="flex-none flex items-center gap-3 px-5 pt-4 pb-3"
            style={{
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg)',
              zIndex: 30,
            }}
          >
            <Avatar state={avatarState} size="sm" />
            <div>
              <div className="text-sm font-semibold tracking-tight" style={{ color: 'var(--fg)' }}>
                Clod Salvador
              </div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>
                AI Automation Specialist · Alfonso, Cavite, PH
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── Scrollable area ── */}
      <div
        className="flex-1 overflow-y-auto scrollbar-thin"
        style={{ position: 'relative', zIndex: 20 }}
      >
        {/* Hero section */}
        <AnimatePresence>
          {!hasMessages && (
            <motion.div
              key="hero"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.28 } }}
              className="flex flex-col items-center justify-center px-4 pb-8"
              style={{ minHeight: 'calc(100dvh - 200px)', paddingTop: '5rem' }}
            >
              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.05 }}
              >
                <Avatar state={avatarState} size="lg" />
              </motion.div>

              {/* Greeting */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.18 }}
                className="mt-7 text-4xl md:text-5xl font-bold tracking-tighter text-center"
                style={{ color: 'var(--fg)' }}
              >
                Hey, I&apos;m Clod{' '}
                <span role="img" aria-label="wave">
                  👋
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.28 }}
                className="mt-2.5 text-base text-center max-w-[52ch]"
                style={{ color: 'var(--muted)' }}
              >
                AI Automation Specialist —{' '}
                <span style={{ color: 'var(--accent)' }}>Alfonso, Cavite, PH</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages */}
        {hasMessages && (
          <div className="max-w-2xl mx-auto px-4 pt-6 pb-4 space-y-5">
            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={
                  isLoading && i === messages.length - 1 && msg.role === 'assistant'
                }
              />
            ))}
            <AnimatePresence>{isThinking && <TypingBubble key="typing" />}</AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex-none px-4 pb-6 pt-3"
        style={{
          borderTop: hasMessages ? '1px solid var(--border)' : 'none',
          background: 'var(--bg)',
          zIndex: 30,
        }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Suggestion chips — only before first message */}
          <AnimatePresence>
            {!hasMessages && (
              <motion.div
                key="chips"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <SuggestionChips onSelect={handleChipSelect} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              placeholder={
                hasMessages
                  ? 'Ask me anything...'
                  : 'Ask about my projects, skills, or how I can automate your business...'
              }
              disabled={isLoading}
              className="chat-input w-full rounded-2xl px-5 py-4 pr-14 text-sm transition-all duration-200 disabled:opacity-60"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, y: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-opacity duration-200 disabled:opacity-30"
              style={{ background: 'var(--accent)', color: '#000' }}
              aria-label="Send message"
            >
              <ArrowUp size={14} weight="bold" />
            </motion.button>
          </form>

          {/* Footer note */}
          <p className="text-center text-[11px] mt-2.5" style={{ color: 'var(--muted)' }}>
            AI avatar powered by Groq · Reach me at{' '}
            <a
              href="mailto:clodsalvador520@gmail.com"
              className="transition-colors duration-200"
              style={{ color: 'var(--accent)' }}
            >
              clodsalvador520@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
