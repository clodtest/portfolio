# Portfolio — Claude Guidelines

This is a personal portfolio website. Build it to production-grade standards with a high-end, distinctive aesthetic that avoids all generic AI design patterns.

---

## Design System Dials

These are the active baseline values for all generated UI. Override them only when explicitly requested in chat.

| Dial | Value | Meaning |
|---|---|---|
| DESIGN_VARIANCE | 8/10 | Asymmetric layouts, fractional grids, massive whitespace zones |
| MOTION_INTENSITY | 6/10 | Fluid CSS transitions, staggered load-ins, spring physics on interactions |
| VISUAL_DENSITY | 4/10 | Standard web app spacing — breathable, not sparse, not packed |

---

## Tech Stack

- **Framework**: React or Next.js. Default to Server Components (RSC). Wrap providers in `"use client"` components.
- **Styling**: Tailwind CSS. Check `package.json` for v3 vs v4 before writing config. Never use v4 syntax in a v3 project.
- **Animation**: Framer Motion for UI interactions. GSAP/ThreeJS only for isolated full-page scrolltelling or canvas backgrounds — never mix with Framer Motion in the same tree.
- **Icons**: `@phosphor-icons/react` or `@radix-ui/react-icons` only. Emojis are banned in all code and markup.
- **State**: Local `useState`/`useReducer` for UI. Global state only to avoid deep prop-drilling.

**Dependency check**: Before importing any third-party library, verify it exists in `package.json`. If missing, output the install command before the code.

---

## Architecture Rules

- Interactive components using motion or state MUST be isolated as leaf `"use client"` components. Server Components render static layouts only.
- Full-height sections: always `min-h-[100dvh]`, never `h-screen`.
- Page layout container: `max-w-[1400px] mx-auto` or `max-w-7xl`.
- Layouts: CSS Grid over flexbox math. Never use `w-[calc(33%-1rem)]`-style tricks.
- Z-index: only for systemic layers (sticky navbars, modals, overlays). No random `z-50`.
- Performance: animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height`.
- Grain/noise filters go on `fixed inset-0 pointer-events-none` pseudo-elements only — never on scrolling containers.

---

## Typography

- **Headlines**: `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body**: `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- **Allowed fonts**: `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`
- **Banned fonts**: `Inter`, `Roboto`, `Arial`, system fonts, `Space Grotesk`
- Serif fonts: only for editorial/creative contexts. Never on dashboards or technical UI.
- Weight and color control hierarchy — not raw scale. No screaming H1s.

---

## Color

- Maximum 1 accent color. Saturation < 80%.
- Base palettes: Zinc or Slate (neutral). Pick one and stay consistent — never mix warm and cool grays in the same project.
- Accent examples: Emerald, Electric Blue, Deep Rose.
- **Banned**: purple/blue AI aesthetic, neon gradients, glowing `box-shadow`, gradient text on large headers, `#000000` (use Zinc-950 or off-black instead).

---

## Layout

- Centered hero sections are banned when DESIGN_VARIANCE > 4. Use: Split Screen (50/50), Left content / Right asset, or Asymmetric whitespace.
- 3-column equal card layouts are banned. Use: 2-column zig-zag, asymmetric grid, or horizontal scroll.
- Cards only when elevation communicates hierarchy. When shadowed, tint the shadow to the background hue.
- High-variance layouts (DESIGN_VARIANCE 8+) must collapse to strict single-column (`w-full px-4 py-8`) on mobile (`< 768px`).

---

## Motion (MOTION_INTENSITY = 6)

- Use `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)` as the default easing.
- Stagger list/grid reveals with `animation-delay: calc(var(--index) * 100ms)` or Framer Motion `staggerChildren`.
- Spring physics on interactive elements: `type: "spring", stiffness: 100, damping: 20`.
- Tactile feedback on `:active`: `-translate-y-[1px]` or `scale-[0.98]`.
- Magnetic hover (if used): implement via Framer Motion `useMotionValue` + `useTransform` only — never `useState` for continuous animation.
- Perpetual micro-animations must be memoized and isolated in their own Client Component. Never trigger parent re-renders.

---

## Forbidden Patterns (AI Tells)

### Visual
- No neon outer glows
- No pure black (`#000000`)
- No oversaturated accents
- No excessive gradient text
- No custom mouse cursors
- No purple/blue AI gradient aesthetic

### Typography
- No Inter font
- No oversized screaming H1
- No serif on dashboards or software UI

### Layout & Content
- No 3-equal-column card feature rows
- No centered hero (DESIGN_VARIANCE > 4)
- No generic placeholder names ("John Doe", "Acme", "Nexus")
- No fake round numbers (`99.99%`, `50%`) — use organic data (`47.2%`)
- No AI copywriting clichés ("Seamless", "Elevate", "Unleash", "Next-Gen")
- No Unsplash URLs — use `https://picsum.photos/seed/{string}/800/600` or SVG avatars

### Components
- No default, unstyled shadcn/ui — always customize radii, colors, shadows
- No generic circular spinners — use skeletal loaders matching layout dimensions

---

## Interaction States (Always Implement)

Every interactive component must include:
- **Loading**: skeletal loaders matching layout dimensions
- **Empty**: composed empty state with guidance
- **Error**: inline error reporting below the relevant field
- **Active/Tactile**: scale or translate feedback on press

---

## Pre-Flight Checklist

Before any component is considered complete, verify:
- [ ] Full-height sections use `min-h-[100dvh]`, not `h-screen`
- [ ] High-variance layouts collapse to single-column on mobile
- [ ] Perpetual animations are isolated in their own Client Component
- [ ] `useEffect` animations have cleanup functions
- [ ] No third-party imports without verifying `package.json`
- [ ] Empty, loading, and error states are implemented
- [ ] No Inter font, purple gradients, or centered hero sections
- [ ] Shadows are tinted to the background hue, not generic black
