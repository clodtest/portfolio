'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, memo, useId } from 'react'

export type AvatarState = 'idle' | 'thinking' | 'speaking'
export type AvatarSize = 'sm' | 'lg'

interface AvatarProps {
  state?: AvatarState
  size?: AvatarSize
}

interface FaceProps {
  eyeRy: number
  state: AvatarState
  uid: string
}

function AvatarFace({ eyeRy, state, uid }: FaceProps) {
  const thinking = state === 'thinking'
  const speaking = state === 'speaking'

  // Unique IDs per instance prevent SVG defs conflicts when
  // hero avatar and header avatar are both mounted during transitions.
  const bgId   = `${uid}-bg`
  const glLId  = `${uid}-gl`
  const glRId  = `${uid}-gr`
  const filtId = `${uid}-f`

  const mouthPath = speaking
    ? 'M 35 66 Q 50 78 65 66'
    : 'M 40 64 Q 50 70 60 64'

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id={bgId} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#162a25" />
          <stop offset="60%" stopColor="#0b1a16" />
          <stop offset="100%" stopColor="#050e0b" />
        </radialGradient>
        <radialGradient id={glLId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4b8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00d4b8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={glRId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4b8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00d4b8" stopOpacity="0" />
        </radialGradient>
        <filter id={filtId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <circle cx="50" cy="50" r="50" fill={`url(#${bgId})`} />

      {/* Inner decorative ring */}
      <circle
        cx="50" cy="50" r="44"
        stroke="#00d4b8" strokeWidth="0.4" strokeOpacity="0.15" strokeDasharray="2 8"
      />

      {/* Eye glow halos */}
      <ellipse cx="34" cy="43" rx="10" ry="10" fill={`url(#${glLId})`} />
      <ellipse cx="66" cy="43" rx="10" ry="10" fill={`url(#${glRId})`} />

      {/* Left eye */}
      <ellipse
        cx="34" cy="43" rx="5" ry={eyeRy}
        fill="#00d4b8" opacity={thinking ? 0.65 : 0.92}
        filter={`url(#${filtId})`}
      />

      {/* Right eye */}
      <ellipse
        cx="66" cy="43" rx="5" ry={eyeRy}
        fill="#00d4b8" opacity={thinking ? 0.65 : 0.92}
        filter={`url(#${filtId})`}
      />

      {/* Eye highlights */}
      {eyeRy > 1 && (
        <>
          <circle cx="36" cy="41" r="1.8" fill="white" opacity="0.65" />
          <circle cx="68" cy="41" r="1.8" fill="white" opacity="0.65" />
        </>
      )}

      {/* Nose dot */}
      <circle cx="50" cy="55" r="1.8" fill="#00d4b8" opacity="0.4" />

      {/* Mouth */}
      {!thinking && (
        <path
          d={mouthPath}
          stroke="#00d4b8" strokeWidth="2.5" fill="none"
          strokeLinecap="round" opacity="0.75"
          filter={`url(#${filtId})`}
        />
      )}

      {/* Thinking dots */}
      {thinking && (
        <>
          <circle cx="42" cy="64" r="2.5" fill="#00d4b8" opacity="0.55" />
          <circle cx="50" cy="64" r="2.5" fill="#00d4b8" opacity="0.40" />
          <circle cx="58" cy="64" r="2.5" fill="#00d4b8" opacity="0.25" />
        </>
      )}
    </svg>
  )
}

const Avatar = memo(function Avatar({ state = 'idle', size = 'lg' }: AvatarProps) {
  const [eyeRy, setEyeRy] = useState(4.5)
  const blinkRef = useRef<ReturnType<typeof setTimeout>>()
  const uid = useId().replace(/:/g, '')   // stable unique prefix per instance
  const dim = size === 'lg' ? 128 : 40

  // Random blink every 3–6s
  useEffect(() => {
    const schedule = () => {
      blinkRef.current = setTimeout(
        () => {
          setEyeRy(0.2)
          setTimeout(() => {
            setEyeRy(4.5)
            schedule()
          }, 130)
        },
        3000 + Math.random() * 3000
      )
    }
    schedule()
    return () => clearTimeout(blinkRef.current)
  }, [])

  const glowShadow =
    state === 'thinking'
      ? '0 0 28px rgba(0,212,184,0.55), 0 0 60px rgba(0,212,184,0.18)'
      : '0 0 18px rgba(0,212,184,0.28), 0 0 38px rgba(0,212,184,0.08)'

  return (
    <div className="relative flex-shrink-0" style={{ width: dim, height: dim }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none transition-all duration-700"
        style={{ boxShadow: glowShadow }}
      />

      {/* Breathing / pulse container */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        animate={{ scale: [1, 1.022, 1] }}
        transition={{
          duration: state === 'thinking' ? 1.4 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <AvatarFace eyeRy={eyeRy} state={state} uid={uid} />
      </motion.div>

      {/* Thinking orbit ring */}
      <AnimatePresence>
        {state === 'thinking' && (
          <motion.div
            key="orbit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.25 },
              rotate: { duration: 2.2, repeat: Infinity, ease: 'linear' },
            }}
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-5px',
              width: `calc(100% + 10px)`,
              height: `calc(100% + 10px)`,
              border: '1.5px dashed rgba(0,212,184,0.45)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
})

export default Avatar
