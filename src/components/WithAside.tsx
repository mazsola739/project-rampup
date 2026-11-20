import type { ReactNode } from 'react'

/** The 2022 page grid: the main list on the left, a smaller list on the right (below on phones). */
export function WithAside({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section className="flex min-w-0 flex-col gap-5">{children}</section>
      <aside className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-16 lg:self-start">
        {aside}
      </aside>
    </div>
  )
}
