'use client'

import { useMemo, useState } from 'react'
import { Calculator } from '@phosphor-icons/react'

interface Field {
  value: string
  error: string | null
}

const initial = (value: string): Field => ({ value, error: null })

function validate(name: string, raw: string): string | null {
  const n = Number(raw)
  if (raw.trim() === '' || Number.isNaN(n)) return 'Enter a number'
  if (name === 'price' && (n < 10000 || n > 20000000))
    return 'Enter a price between $10,000 and $20,000,000'
  if (name === 'down' && (n < 0 || n > 100)) return 'Enter a percentage from 0 to 100'
  if (name === 'rate' && (n <= 0 || n > 20)) return 'Enter a rate between 0 and 20'
  if (name === 'term' && (n < 5 || n > 40)) return 'Enter a term between 5 and 40 years'
  return null
}

export default function MortgageCalculator() {
  const [fields, setFields] = useState<Record<string, Field>>({
    price: initial('425000'),
    down: initial('10'),
    rate: initial('6.75'),
    term: initial('30'),
  })

  const set = (name: string, value: string) =>
    setFields((f) => ({ ...f, [name]: { value, error: f[name].error && validate(name, value) } }))

  const blur = (name: string) =>
    setFields((f) => ({ ...f, [name]: { ...f[name], error: validate(name, f[name].value) } }))

  const result = useMemo(() => {
    for (const name of Object.keys(fields)) {
      if (validate(name, fields[name].value)) return null
    }
    const price = Number(fields.price.value)
    const principal = price * (1 - Number(fields.down.value) / 100)
    const monthlyRate = Number(fields.rate.value) / 100 / 12
    const months = Number(fields.term.value) * 12
    const factor = Math.pow(1 + monthlyRate, months)
    const payment = (principal * monthlyRate * factor) / (factor - 1)
    return { principal, payment }
  }, [fields])

  const money = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm shadow-stone-300/50 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700/10 text-teal-800">
          <Calculator size={22} aria-hidden />
        </span>
        <h3 className="text-xl font-semibold text-stone-900">Monthly payment estimator</h3>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <NumberField
          id="price"
          label="Home price"
          prefix="$"
          field={fields.price}
          onChange={(v) => set('price', v)}
          onBlur={() => blur('price')}
          help="Purchase price before down payment"
        />
        <NumberField
          id="down"
          label="Down payment"
          suffix="%"
          field={fields.down}
          onChange={(v) => set('down', v)}
          onBlur={() => blur('down')}
          help="Percent of the price paid upfront"
        />
        <NumberField
          id="rate"
          label="Interest rate"
          suffix="%"
          field={fields.rate}
          onChange={(v) => set('rate', v)}
          onBlur={() => blur('rate')}
          help="Annual rate — ask us for today's quotes"
        />
        <NumberField
          id="term"
          label="Loan term"
          suffix="yrs"
          field={fields.term}
          onChange={(v) => set('term', v)}
          onBlur={() => blur('term')}
          help="Most buyers choose 15 or 30 years"
        />
      </div>

      <div
        className="mt-6 rounded-xl bg-teal-700/5 px-5 py-4"
        role="status"
        aria-live="polite"
      >
        {result ? (
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-sm text-stone-600">Estimated monthly principal &amp; interest</p>
              <p className="text-3xl font-semibold tabular-nums text-teal-800">
                {money(result.payment)}
                <span className="text-base font-normal text-stone-500">/mo</span>
              </p>
            </div>
            <p className="text-sm tabular-nums text-stone-600">
              Loan amount: {money(result.principal)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-stone-600">
            Fix the highlighted fields above to see your estimate.
          </p>
        )}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-stone-500">
        Estimate covers principal and interest only — taxes, insurance, HOA dues,
        and mortgage insurance are extra. This is not a loan offer or a rate quote.
      </p>
    </div>
  )
}

function NumberField({
  id,
  label,
  field,
  onChange,
  onBlur,
  help,
  prefix,
  suffix,
}: {
  id: string
  label: string
  field: Field
  onChange: (value: string) => void
  onBlur: () => void
  help: string
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <label htmlFor={`calc-${id}`} className="block text-sm font-medium text-stone-800">
        {label}
      </label>
      <div
        className={`mt-1.5 flex items-center rounded-xl border bg-white px-3 transition-colors focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700/20 ${
          field.error ? 'border-red-600' : 'border-stone-300'
        }`}
      >
        {prefix && <span className="text-sm text-stone-500">{prefix}</span>}
        <input
          id={`calc-${id}`}
          type="number"
          inputMode="decimal"
          value={field.value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={field.error ? true : undefined}
          aria-describedby={field.error ? `calc-${id}-error` : `calc-${id}-help`}
          className="w-full bg-transparent px-2 py-3 text-base tabular-nums text-stone-900 outline-none"
        />
        {suffix && <span className="text-sm text-stone-500">{suffix}</span>}
      </div>
      {field.error ? (
        <p id={`calc-${id}-error`} role="alert" className="mt-1 text-sm text-red-700">
          {field.error}
        </p>
      ) : (
        <p id={`calc-${id}-help`} className="mt-1 text-xs text-stone-500">
          {help}
        </p>
      )}
    </div>
  )
}
