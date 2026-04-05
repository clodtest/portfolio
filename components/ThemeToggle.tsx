'use client'

import { Sun, Moon } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--muted)',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={15} weight="duotone" />
      ) : (
        <Moon size={15} weight="duotone" />
      )}
    </motion.button>
  )
}
