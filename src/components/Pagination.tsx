import { pageItems } from './paging.ts'

const pageButton =
  'grid h-9 min-w-9 cursor-pointer place-items-center rounded-lg px-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40'
const idle = 'border border-line bg-card hover:border-accent'
const active = 'bg-bar text-bar-ink'

type Props = {
  page: number
  pages: number
  onChange: (page: number) => void
  /** What the list is, for the label: "Posts pages". */
  label: string
  /** Only previous / next and "2 / 25", for the narrow side columns. */
  compact?: boolean
  /** True while the next page loads: the buttons wait. */
  busy?: boolean
}

/**
 * Page navigation: first / previous / page numbers / next / last. In 2022 the full version was
 * written but never wired in; now every list uses it.
 */
export function Pagination({ page, pages, onChange, label, compact = false, busy = false }: Props) {
  if (pages <= 1) return null
  const go = (target: number) => {
    if (target !== page) onChange(target)
  }

  return (
    <nav aria-label={`${label} pages`} className="flex flex-wrap items-center gap-1.5">
      {!compact && (
        <button
          type="button"
          className={`${pageButton} ${idle}`}
          onClick={() => go(1)}
          disabled={page === 1 || busy}
          aria-label="First page"
        >
          «
        </button>
      )}
      <button
        type="button"
        className={`${pageButton} ${idle}`}
        onClick={() => go(page - 1)}
        disabled={page === 1 || busy}
        aria-label="Previous page"
      >
        ‹
      </button>

      {compact ? (
        <span className="px-2 text-sm text-muted tabular-nums">
          {page} / {pages}
        </span>
      ) : (
        pageItems(page, pages).map((item, index) =>
          item === 'gap' ? (
            // biome-ignore lint/suspicious/noArrayIndexKey: there are at most two gaps, in a fixed place
            <span key={`gap-${index}`} className="px-1 text-muted" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={`${pageButton} tabular-nums ${item === page ? active : idle}`}
              onClick={() => go(item)}
              disabled={busy && item !== page}
              aria-current={item === page ? 'page' : undefined}
              aria-label={`Page ${item}`}
            >
              {item}
            </button>
          ),
        )
      )}

      <button
        type="button"
        className={`${pageButton} ${idle}`}
        onClick={() => go(page + 1)}
        disabled={page === pages || busy}
        aria-label="Next page"
      >
        ›
      </button>
      {!compact && (
        <button
          type="button"
          className={`${pageButton} ${idle}`}
          onClick={() => go(pages)}
          disabled={page === pages || busy}
          aria-label="Last page"
        >
          »
        </button>
      )}
    </nav>
  )
}
