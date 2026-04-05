'use client'

import { motion } from 'framer-motion'

const CHIPS = [
  'Show me your best projects',
  'What tools do you use?',
  'How can we collaborate?',
  'Walk me through your automation process',
  "What's your background?",
  'Tell me a fun fact',
]

interface SuggestionChipsProps {
  onSelect: (text: string) => void
}

export default function SuggestionChips({ onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {CHIPS.map((chip, i) => (
        <motion.button
          key={chip}
          onClick={() => onSelect(chip)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.06 + 0.4,
            type: 'spring',
            stiffness: 240,
            damping: 22,
          }}
          whileHover={{ scale: 1.04, borderColor: 'var(--accent)' }}
          whileTap={{ scale: 0.97, y: 1 }}
          className="text-xs px-4 py-2.5 rounded-full cursor-pointer transition-colors duration-200"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--muted)',
          }}
        >
          {chip}
        </motion.button>
      ))}
    </div>
  )
}
