'use client'

import { useRef, useState } from 'react'
import { CheckCircle, CircleNotch, WarningCircle } from '@phosphor-icons/react'

interface FormState {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: keyof FormState, value: string): string | undefined {
  if (name === 'name' && value.trim().length < 2) return 'Please enter your name'
  if (name === 'email' && !EMAIL_RE.test(value))
    return 'Enter a valid email address, like you@example.com'
  if (name === 'message' && value.trim().length < 10)
    return 'Tell us a little more — at least a sentence helps us respond well'
  return undefined
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    interest: 'buying',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (name: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) }))
  }

  const blur = (name: keyof FormState) =>
    setErrors((e) => ({ ...e, [name]: validateField(name, form[name]) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Errors = {}
    for (const key of ['name', 'email', 'message'] as const) {
      const err = validateField(key, form[key])
      if (err) nextErrors[key] = err
    }
    setErrors(nextErrors)
    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="rounded-2xl border border-teal-700/20 bg-teal-700/5 px-6 py-12 text-center"
        role="status"
      >
        <CheckCircle size={40} weight="fill" className="mx-auto text-teal-700" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold text-stone-900">Message sent</h3>
        <p className="mx-auto mt-2 max-w-[45ch] text-sm leading-relaxed text-stone-600">
          Thanks for reaching out, {form.name.split(' ')[0]}. We usually reply
          within one business day.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="name"
          label="Full name"
          required
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={(v) => set('name', v)}
          onBlur={() => blur('name')}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(v) => set('email', v)}
          onBlur={() => blur('email')}
        />
        <TextField
          name="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => set('phone', v)}
          onBlur={() => blur('phone')}
        />
        <div>
          <label htmlFor="contact-interest" className="block text-sm font-medium text-stone-800">
            I&apos;m interested in
          </label>
          <select
            id="contact-interest"
            name="interest"
            value={form.interest}
            onChange={(e) => set('interest', e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 transition-colors focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
          >
            <option value="buying">Buying a home</option>
            <option value="selling">Selling a home</option>
            <option value="loan">Mortgage / pre-approval</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="block text-sm font-medium text-stone-800">
          How can we help? <span aria-hidden="true" className="text-red-700">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          onBlur={() => blur('message')}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-3 text-base text-stone-900 transition-colors focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 ${
            errors.message ? 'border-red-600' : 'border-stone-300'
          }`}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1 text-sm text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <WarningCircle size={18} aria-hidden />
          Something went wrong sending your message. Please try again, or email
          us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal-700 px-8 py-3.5 text-base font-semibold text-white shadow-sm shadow-teal-900/20 transition-all hover:bg-teal-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'sending' && (
          <CircleNotch size={18} className="animate-spin" aria-hidden />
        )}
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

function TextField({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  required = false,
  autoComplete,
}: {
  name: string
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  const id = `contact-${name}`
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-800">
        {label}{' '}
        {required && (
          <span aria-hidden="true" className="text-red-700">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-3 text-base text-stone-900 transition-colors focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 ${
          error ? 'border-red-600' : 'border-stone-300'
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
