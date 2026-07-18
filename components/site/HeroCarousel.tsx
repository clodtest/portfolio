'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { heroSlides } from '@/lib/hero-slides'
import { site } from '@/lib/site'

const AUTOPLAY_MS = 5500
const SWIPE_THRESHOLD_PX = 48

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return
    goTo(delta < 0 ? index + 1 : index - 1)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goTo(index - 1)
    if (e.key === 'ArrowRight') goTo(index + 1)
  }

  const slide = heroSlides[index]

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured home styles"
      className="relative min-h-[100dvh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className={`absolute inset-0 ${i === index ? 'ken-burns' : ''}`}>
            {/* TODO(Higgsfield): replace s.image with the generated asset at
                s.targetFile using s.higgsfieldPrompt — see lib/hero-slides.ts */}
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/35 to-stone-950/20" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-4 pb-28 pt-24 sm:px-6 md:justify-center md:pb-24">
        <p
          className="text-sm font-medium uppercase tracking-widest text-teal-200"
          aria-live="polite"
        >
          {slide.kicker}
        </p>
        <h1 className="mt-3 max-w-[18ch] text-4xl font-semibold leading-tight text-white md:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-stone-200 md:text-lg">
          From first starter homes to coastal estates, {site.name} guides you
          through the search and the financing — at any budget.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/listings"
            className="rounded-full bg-teal-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-950/30 transition-all hover:bg-teal-500 active:scale-[0.98]"
          >
            View Listings
          </Link>
          <Link
            href="/loans"
            className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/20 active:scale-[0.98]"
          >
            Get Pre-Approved
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 active:scale-[0.95]"
        >
          <CaretLeft size={20} aria-hidden />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.kicker}`}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 active:scale-[0.95]"
        >
          <CaretRight size={20} aria-hidden />
        </button>
      </div>
    </section>
  )
}
