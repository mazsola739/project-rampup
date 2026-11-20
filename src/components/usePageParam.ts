import { useSearchParams } from 'react-router'
import { parsePage } from './paging.ts'

/**
 * The current page of a list, kept in the URL (?page=3): a page can be shared and the back
 * button steps through the pages.
 */
export function usePageParam(): [number, (page: number) => void] {
  const [params, setParams] = useSearchParams()
  const page = parsePage(params.get('page'))
  const setPage = (next: number) => {
    setParams(next === 1 ? {} : { page: String(next) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return [page, setPage]
}
