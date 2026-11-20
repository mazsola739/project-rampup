/** A page number, or a gap ("…") between page numbers that are far apart. */
export type PageItem = number | 'gap'

/**
 * The page buttons to show: always the first and the last page, the current one and its
 * neighbours, with a gap where pages are left out. A gap never stands in for a single page:
 * that page is shown instead.
 *
 * pageItems(1, 17) → [1, 2, 3, 'gap', 17]
 * pageItems(9, 17) → [1, 'gap', 8, 9, 10, 'gap', 17]
 */
export function pageItems(current: number, total: number, siblings = 1): PageItem[] {
  if (total <= 0) return []
  const page = Math.min(Math.max(current, 1), total)
  const from = Math.max(2, page - siblings)
  const to = Math.min(total - 1, page + siblings)

  const items: PageItem[] = [1]
  if (from === 3) items.push(2)
  else if (from > 3) items.push('gap')
  for (let number = from; number <= to; number++) items.push(number)
  if (to === total - 2) items.push(total - 1)
  else if (to < total - 2) items.push('gap')
  if (total > 1) items.push(total)

  // Near the start or the end, show one more page instead of a lonely neighbour.
  if (page === 1 && total > 3 && items[2] === 'gap') items.splice(2, 0, 3)
  if (page === total && total > 3 && items.at(-3) === 'gap') items.splice(-2, 0, total - 2)
  return items
}

/** The number of pages a list of `total` items fills, at least 1. */
export const pageCount = (total: number, pageSize: number) =>
  Math.max(1, Math.ceil(total / pageSize))

/** A ?page= value from the URL as a page number: 1 when it is missing or not a number. */
export function parsePage(value: string | null): number {
  const page = Number(value)
  return Number.isInteger(page) && page >= 1 ? page : 1
}
