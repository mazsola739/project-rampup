import type { Page } from './types.ts'

export const API_URL = 'https://jsonplaceholder.typicode.com'

/** A response that is not 2xx, e.g. 404 for a post that does not exist. */
export class ApiError extends Error {
  readonly status: number

  constructor(status: number, path: string) {
    super(status === 404 ? 'Not found.' : `The request failed (HTTP ${status}).`)
    this.name = 'ApiError'
    this.status = status
    this.cause = path
  }
}

async function request(path: string, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(`${API_URL}/${path}`, { signal })
  if (!response.ok) throw new ApiError(response.status, path)
  return response
}

/** GETs one resource or a whole list, e.g. `getJson<User>('users/1')`. */
export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await request(path, signal)
  return (await response.json()) as T
}

/**
 * GETs one page of a list, e.g. `getPage<Post>('posts', 2, 6)`. JSONPlaceholder pages with
 * `_page` and `_limit` and sends the size of the whole list in the X-Total-Count header.
 */
export async function getPage<T>(
  path: string,
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<Page<T>> {
  const separator = path.includes('?') ? '&' : '?'
  const response = await request(`${path}${separator}_page=${page}&_limit=${limit}`, signal)
  const items = (await response.json()) as T[]
  const total = Number(response.headers.get('X-Total-Count') ?? items.length)
  return { items, total: Number.isFinite(total) ? total : items.length }
}
