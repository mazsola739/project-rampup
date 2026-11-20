import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowLeftIcon } from './icons.tsx'

/** "← All posts": the way back to the list a detail page came from. */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-muted hover:text-ink hover:underline"
    >
      <ArrowLeftIcon />
      {children}
    </Link>
  )
}
