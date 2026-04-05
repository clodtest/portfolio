import React from 'react'

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []

  // Split by bold (**text**) first
  const boldSplit = text.split(/(\*\*[^*]+\*\*)/)
  boldSplit.forEach((segment, bi) => {
    if (segment.startsWith('**') && segment.endsWith('**') && segment.length > 4) {
      nodes.push(
        <strong key={`${keyPrefix}-b${bi}`} className="font-semibold" style={{ color: 'var(--accent)' }}>
          {segment.slice(2, -2)}
        </strong>
      )
      return
    }

    // Split remaining by inline code (`code`)
    const codeSplit = segment.split(/(`[^`]+`)/)
    codeSplit.forEach((part, ci) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        nodes.push(
          <code
            key={`${keyPrefix}-b${bi}-c${ci}`}
            className="rounded px-1.5 py-0.5 text-xs font-mono"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--accent)' }}
          >
            {part.slice(1, -1)}
          </code>
        )
        return
      }

      // Split by italic (*text*) — be careful not to double-match bold
      const italicSplit = part.split(/(\*[^*]+\*)/)
      italicSplit.forEach((ip, ii) => {
        if (ip.startsWith('*') && ip.endsWith('*') && ip.length > 2) {
          nodes.push(
            <em key={`${keyPrefix}-b${bi}-c${ci}-i${ii}`} className="italic opacity-90">
              {ip.slice(1, -1)}
            </em>
          )
        } else if (ip) {
          nodes.push(ip)
        }
      })
    })
  })

  return nodes
}

export function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre
          key={`pre-${i}`}
          className="rounded-xl overflow-x-auto my-2 p-4 text-xs font-mono leading-relaxed"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <code style={{ color: 'var(--fg)' }}>{codeLines.join('\n')}</code>
        </pre>
      )
      i++
      continue
    }

    // Heading H3 (###)
    if (line.startsWith('### ')) {
      elements.push(
        <p key={`h3-${i}`} className="font-semibold text-sm mt-3 mb-1" style={{ color: 'var(--accent)' }}>
          {parseInline(line.slice(4), `h3-${i}`)}
        </p>
      )
      i++
      continue
    }

    // Heading H2 (##)
    if (line.startsWith('## ')) {
      elements.push(
        <p key={`h2-${i}`} className="font-semibold mt-3 mb-1" style={{ color: 'var(--fg)' }}>
          {parseInline(line.slice(3), `h2-${i}`)}
        </p>
      )
      i++
      continue
    }

    // Unordered list (- or * or •)
    if (line.match(/^[-*•] /)) {
      const items: string[] = []
      while (i < lines.length && lines[i].match(/^[-*•] /)) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-1 my-1 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex gap-2 items-start">
              <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
              <span>{parseInline(item, `ul-${i}-${j}`)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list (1. 2. etc.)
    if (line.match(/^\d+\. /)) {
      const items: string[] = []
      let num = 1
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
        num++
      }
      elements.push(
        <ol key={`ol-${i}`} className="space-y-1 my-1 pl-1">
          {items.map((item, j) => (
            <li key={j} className="flex gap-2 items-start">
              <span className="flex-shrink-0 text-xs font-mono mt-0.5" style={{ color: 'var(--accent)' }}>
                {j + 1}.
              </span>
              <span>{parseInline(item, `ol-${i}-${j}`)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Horizontal rule
    if (line.match(/^[-─]{3,}$/)) {
      elements.push(
        <hr key={`hr-${i}`} className="my-3 opacity-20" style={{ borderColor: 'var(--border)' }} />
      )
      i++
      continue
    }

    // Empty line — paragraph break (skip)
    if (line.trim() === '') {
      i++
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="leading-relaxed">
        {parseInline(line, `p-${i}`)}
      </p>
    )
    i++
  }

  return <div className="space-y-1.5">{elements}</div>
}
