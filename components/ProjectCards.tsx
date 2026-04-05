'use client'

import { motion } from 'framer-motion'
import { useRef, useCallback } from 'react'

const PROJECTS = [
  {
    id: 1,
    title: 'Automated Lead Enrichment',
    description:
      'Multi-source lead capture pipeline that auto-enriches contact data, scores leads by intent signals, and routes them into the CRM with zero manual input.',
    stack: ['N8N', 'Make.com', 'ChatGPT', 'GoHighLevel'],
    metrics: ['25–30 hrs saved/week', '100% automated', '3× faster response'],
    image: '/projects/lead-enrichment.png',
    accent: '#00d4b8',
    gradFrom: '#0d2520',
    gradTo: '#061210',
  },
  {
    id: 2,
    title: 'Automated Content Repurposing Engine',
    description:
      'Long-form content goes in — AI splits, rewrites, and distributes short-form clips, captions, and posts across every channel automatically.',
    stack: ['Make.com', 'ChatGPT', 'Canva AI', 'Meta Business Suite'],
    metrics: ['40+ hrs saved/month', '100% automated', 'Daily consistent output'],
    image: '/projects/content-repurposing.png',
    accent: '#00d4a0',
    gradFrom: '#0d2519',
    gradTo: '#060e0a',
  },
  {
    id: 3,
    title: 'Drip Email Campaign',
    description:
      'Behavior-triggered email sequences that adapt based on open/click signals — nurturing cold leads to booked calls without manual follow-up.',
    stack: ['GoHighLevel', 'Zapier', 'ChatGPT', 'Google Workspace'],
    metrics: ['60% less admin', '100% automated', 'Full pipeline visibility'],
    image: '/projects/drip-email.png',
    accent: '#00c4d8',
    gradFrom: '#0d2025',
    gradTo: '#06101a',
  },
  {
    id: 4,
    title: 'Automated CRM → Excel Documentation',
    description:
      'CRM pipeline data synced and structured into formatted Excel reports automatically — eliminating manual data entry and export tasks entirely.',
    stack: ['N8N', 'GoHighLevel', 'Google Sheets', 'Make.com'],
    metrics: ['15 hrs saved/week', '100% automated', 'Error-free exports'],
    image: '/projects/crm-excel.png',
    accent: '#00b8d4',
    gradFrom: '#0d1e25',
    gradTo: '#060a0e',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 160, damping: 22 },
  },
}

function SpotlightCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--mx', '-1000px')
    card.style.setProperty('--my', '-1000px')
  }, [])

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        '--mx': '-1000px',
        '--my': '-1000px',
      } as React.CSSProperties}
    >
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(200px circle at var(--mx) var(--my), rgba(0,212,184,0.07), transparent 70%)`,
        }}
      />
      {/* Spotlight border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(120px circle at var(--mx) var(--my), rgba(0,212,184,0.14), transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Screenshot */}
      <div
        className="h-44 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})` }}
      >
        <img
          src={project.image}
          alt=""
          className="w-full h-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />

        {/* Subtle tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${project.gradTo}cc 0%, transparent 60%)`,
          }}
        />

        {/* Stack badges — bottom left */}
        <div className="absolute bottom-2.5 left-3 flex flex-wrap gap-1.5 z-10">
          {project.stack.map((tool) => (
            <span
              key={tool}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium backdrop-blur-sm"
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: `1px solid ${project.accent}40`,
                color: project.accent,
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm tracking-tight leading-snug" style={{ color: 'var(--fg)' }}>
          {project.title}
        </h3>
        <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--muted)' }}>
          {project.description}
        </p>

        {/* Metric badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium"
              style={{
                background: 'var(--accent-dim)',
                color: 'var(--accent)',
                border: '1px solid var(--accent-border)',
              }}
            >
              {metric}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-3"
      style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}
    >
      {PROJECTS.map((project) => (
        <SpotlightCard key={project.id} project={project} />
      ))}
    </motion.div>
  )
}
