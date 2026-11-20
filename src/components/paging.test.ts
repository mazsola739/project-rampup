import { describe, expect, it } from 'vitest'
import { pageCount, pageItems, parsePage } from './paging.ts'

describe('pageItems', () => {
  it('shows every page of a short list', () => {
    expect(pageItems(1, 1)).toEqual([1])
    expect(pageItems(2, 3)).toEqual([1, 2, 3])
    expect(pageItems(3, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('puts gaps around the current page in a long list', () => {
    expect(pageItems(9, 17)).toEqual([1, 'gap', 8, 9, 10, 'gap', 17])
  })

  it('shows three pages at the start and at the end', () => {
    expect(pageItems(1, 17)).toEqual([1, 2, 3, 'gap', 17])
    expect(pageItems(17, 17)).toEqual([1, 'gap', 15, 16, 17])
  })

  it('never hides a single page behind a gap', () => {
    expect(pageItems(4, 17)).toEqual([1, 2, 3, 4, 5, 'gap', 17])
    expect(pageItems(14, 17)).toEqual([1, 'gap', 13, 14, 15, 16, 17])
  })

  it('keeps the current page inside the list', () => {
    expect(pageItems(99, 3)).toEqual([1, 2, 3])
    expect(pageItems(0, 0)).toEqual([])
  })
})

describe('pageCount', () => {
  it('rounds up and is at least 1', () => {
    expect(pageCount(100, 6)).toBe(17)
    expect(pageCount(12, 6)).toBe(2)
    expect(pageCount(0, 6)).toBe(1)
  })
})

describe('parsePage', () => {
  it('reads a page number from the URL', () => {
    expect(parsePage('3')).toBe(3)
  })

  it('falls back to the first page', () => {
    for (const value of [null, '', '0', '-2', '1.5', 'abc']) {
      expect(parsePage(value)).toBe(1)
    }
  })
})
