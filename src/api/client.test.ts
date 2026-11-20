import { describe, expect, it, vi } from 'vitest'
import { API_URL, ApiError, getJson, getPage } from './client.ts'

const respond = (body: unknown, init?: ResponseInit) =>
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(body), init)),
  )

describe('getJson', () => {
  it('GETs a resource from JSONPlaceholder', async () => {
    respond({ id: 1, title: 'hello' })
    await expect(getJson('posts/1')).resolves.toEqual({ id: 1, title: 'hello' })
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/posts/1`, { signal: undefined })
  })

  it('throws an ApiError with the status for a failed request', async () => {
    respond({}, { status: 404 })
    const error = await getJson('posts/999').catch((caught: unknown) => caught)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status: 404, message: 'Not found.' })
  })
})

describe('getPage', () => {
  it('asks for one page and reads the size of the whole list', async () => {
    respond([{ id: 7 }], { headers: { 'X-Total-Count': '100' } })
    await expect(getPage('posts', 2, 6)).resolves.toEqual({ items: [{ id: 7 }], total: 100 })
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/posts?_page=2&_limit=6`, {
      signal: undefined,
    })
  })

  it('adds the paging to an address that already has a query', async () => {
    respond([], { headers: { 'X-Total-Count': '0' } })
    await getPage('photos?albumId=1', 1, 1)
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/photos?albumId=1&_page=1&_limit=1`, {
      signal: undefined,
    })
  })

  it('counts the items when the header is missing', async () => {
    respond([{ id: 1 }, { id: 2 }])
    await expect(getPage('posts', 1, 6)).resolves.toMatchObject({ total: 2 })
  })
})
