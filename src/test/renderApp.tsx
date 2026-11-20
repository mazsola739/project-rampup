import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { vi } from 'vitest'
import type { Album, Comment, Photo, Post, Todo, User } from '../api/types.ts'
import { routes } from '../routes.tsx'

const user = (id: number): User => ({
  id,
  name: `Test User ${id}`,
  username: `user${id}`,
  email: `User${id}@example.com`,
  address: {
    street: 'Main Street',
    suite: 'Apt. 1',
    city: 'Testville',
    zipcode: '1000',
    geo: { lat: '0', lng: '0' },
  },
  phone: '555-0100',
  website: 'example.com',
  company: { name: 'Test Ltd', catchPhrase: 'Testing all the things', bs: 'tests' },
})

/** A tiny fake JSONPlaceholder: 13 posts, 2 users, a few comments, albums, photos and todos. */
export const db = {
  users: [user(1), user(2)],
  posts: Array.from(
    { length: 13 },
    (_, index): Post => ({
      id: index + 1,
      userId: (index % 2) + 1,
      title: `post title ${index + 1}`,
      body: `post body ${index + 1}`,
    }),
  ),
  comments: [1, 2, 3].map(
    (id): Comment => ({
      id,
      postId: 1,
      name: `comment name ${id}`,
      email: `c${id}@example.com`,
      body: `comment body ${id}`,
    }),
  ),
  albums: [1, 2].map((id): Album => ({ id, userId: id, title: `album title ${id}` })),
  photos: [1, 2, 3].map(
    (id): Photo => ({
      id,
      albumId: 1,
      title: `photo title ${id}`,
      url: `https://example.com/${id}.jpg`,
      thumbnailUrl: `https://example.com/${id}-thumb.jpg`,
    }),
  ),
  todos: [1, 2].map(
    (id): Todo => ({ id, userId: 1, title: `todo title ${id}`, completed: id === 1 }),
  ),
}

type Resource = keyof typeof db

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
  })

/** Answers the app's requests from `db`, the way JSONPlaceholder does. */
export async function fakeApi(input: RequestInfo | URL): Promise<Response> {
  const url = new URL(String(input))
  const [resource, id, nested] = url.pathname.split('/').filter(Boolean) as [
    Resource,
    string?,
    Resource?,
  ]
  let items: { id: number }[] = db[resource] ?? []

  if (id && nested) {
    const key = `${resource.slice(0, -1)}Id` as 'userId'
    items = (db[nested] as { id: number; userId?: number }[]).filter(
      (item) => (item as Record<string, unknown>)[key] === Number(id),
    )
  } else if (id) {
    const item = items.find((entry) => entry.id === Number(id))
    return item ? json(item) : json({}, { status: 404 })
  }

  const page = Number(url.searchParams.get('_page'))
  const limit = Number(url.searchParams.get('_limit'))
  if (page && limit) {
    return json(items.slice((page - 1) * limit, page * limit), {
      headers: { 'X-Total-Count': String(items.length) },
    })
  }
  return json(items)
}

/** Renders the whole app at `path`, with the fake API and a fresh cache. */
export function renderApp(path: string) {
  const fetchMock = vi.fn(fakeApi)
  vi.stubGlobal('fetch', fetchMock)
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
  return { router, fetchMock }
}
