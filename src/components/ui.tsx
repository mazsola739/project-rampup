import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'
import { ApiError } from '../api/client.ts'

/** Section title in the script font of the 2022 design. */
export function Title({
  as: Tag = 'h2',
  children,
}: {
  as?: 'h1' | 'h2' | 'h3'
  children: ReactNode
}) {
  const size = Tag === 'h1' ? 'text-5xl sm:text-6xl' : Tag === 'h2' ? 'text-4xl' : 'text-3xl'
  return <Tag className={`font-script ${size} leading-tight`}>{children}</Tag>
}

/** A card: the grey boxes of the 2022 design, with rounded corners. `flush`: no padding. */
export function Card({
  className = '',
  flush = false,
  ...props
}: ComponentProps<'article'> & { flush?: boolean }) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border border-line bg-card shadow-sm ${flush ? 'overflow-hidden' : 'p-4'} ${className}`}
      {...props}
    />
  )
}

const buttonClass =
  'inline-flex items-center justify-center gap-1.5 rounded-lg border border-muted/40 bg-bar px-3.5 py-1.5 text-sm font-semibold text-bar-ink transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-line'

/** The "Click" button of 2022, now a real link with a meaningful label. */
export function ButtonLink({ className = '', ...props }: ComponentProps<typeof Link>) {
  return <Link className={`${buttonClass} self-end ${className}`} {...props} />
}

export function Button({ className = '', ...props }: ComponentProps<'button'>) {
  return (
    <button type="button" className={`${buttonClass} cursor-pointer ${className}`} {...props} />
  )
}

/** Placeholder blocks while a list loads. */
export function Skeleton({
  count = 3,
  className = 'h-32',
}: {
  count?: number
  className?: string
}) {
  return (
    <div className="contents" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholders, never reordered
          key={index}
          className={`animate-pulse rounded-xl bg-line/40 motion-reduce:animate-none ${className}`}
        />
      ))}
    </div>
  )
}

/** Loading message for screen readers and a spinner for everyone else. */
export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <p role="status" className="flex items-center gap-2 py-4 text-muted">
      <span className="size-4 animate-spin rounded-full border-2 border-line border-t-accent motion-reduce:animate-none" />
      {label}
    </p>
  )
}

/** Error box with a retry button. */
export function ErrorMessage({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message =
    error instanceof ApiError || error instanceof Error ? error.message : 'Something went wrong.'
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-400/60 bg-red-50 p-4 text-red-900 dark:bg-red-950/40 dark:text-red-200"
    >
      <p>
        <strong>Oops!</strong> {message}
      </p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  )
}

/** Whether a query failed because the resource does not exist. */
export const isNotFound = (error: unknown) => error instanceof ApiError && error.status === 404
