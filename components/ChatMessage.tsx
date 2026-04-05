'use client'

import { motion } from 'framer-motion'
import Avatar from './Avatar'
import ProjectCards from './ProjectCards'
import { renderMarkdown } from '@/lib/markdown'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system' | 'data'
  content: string
}

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user'

  const showProjects =
    !isUser &&
    !isStreaming &&
    message.content.includes('<!--PROJECTS-->')

  const displayContent = message.content.replace('<!--PROJECTS-->', '').trim()

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 12, y: 6 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="flex justify-end"
      >
        <div
          className="max-w-[80%] px-4 py-3 rounded-2xl rounded-br-md text-sm leading-relaxed"
          style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--fg)',
          }}
        >
          {message.content}
        </div>
      </motion.div>
    )
  }

  // Assistant message
  return (
    <motion.div
      initial={{ opacity: 0, x: -12, y: 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-end gap-3">
        {/* Small avatar in chat */}
        <div className="flex-shrink-0">
          <Avatar state={isStreaming ? 'thinking' : 'speaking'} size="sm" />
        </div>

        {/* Bubble */}
        <div
          className="relative max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md text-sm leading-relaxed"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'inset 0 1px 0 rgba(0,212,184,0.06)',
            color: 'var(--fg)',
          }}
        >
          {displayContent ? (
            renderMarkdown(displayContent)
          ) : (
            <span style={{ color: 'var(--muted)' }}>...</span>
          )}

          {isStreaming && (
            <span
              className="inline-block w-0.5 h-3.5 rounded-full ml-0.5 align-middle cursor-blink"
              style={{ background: 'var(--accent)' }}
            />
          )}
        </div>
      </div>

      {/* Project cards — rendered below the bubble, aligned with it */}
      {showProjects && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 24 }}
          className="ml-11"
        >
          <ProjectCards />
        </motion.div>
      )}
    </motion.div>
  )
}
