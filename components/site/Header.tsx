'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, List, X } from '@phosphor-icons/react'
import { navLinks, site } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-stone-900 transition-opacity hover:opacity-80"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white">
            <House size={20} weight="fill" aria-hidden />
          </span>
          <span className="text-base font-semibold leading-tight sm:text-lg">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-teal-700/10 text-teal-800'
                    : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/loans"
            className="ml-2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-teal-900/20 transition-all hover:bg-teal-800 active:scale-[0.98]"
          >
            Get Pre-Approved
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-stone-700 transition-colors hover:bg-stone-200/60 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={24} aria-hidden /> : <List size={24} aria-hidden />}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-stone-200 bg-stone-50 px-4 pb-4 pt-2 md:hidden"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  active
                    ? 'bg-teal-700/10 text-teal-800'
                    : 'text-stone-700 hover:bg-stone-200/60'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/loans"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-xl bg-teal-700 px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-800"
          >
            Get Pre-Approved
          </Link>
        </nav>
      )}
    </header>
  )
}
