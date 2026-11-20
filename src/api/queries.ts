import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { getJson, getPage } from './client.ts'
import type { Album, Comment, Photo, Post, Todo, User } from './types.ts'

/** Page sizes of the lists. */
export const PAGE_SIZE = {
  posts: 6,
  albums: 6,
  comments: 4,
  photos: 12,
  todos: 5,
} as const

/*
 * Query options for every request of the app, in one place: the pages call
 * useQuery(postQuery(id)), and TanStack Query caches and dedupes by these keys.
 * Paged lists keep showing the previous page while the next one loads.
 */

export const postsQuery = (page: number) =>
  queryOptions({
    queryKey: ['posts', 'page', page],
    queryFn: ({ signal }) => getPage<Post>('posts', page, PAGE_SIZE.posts, signal),
    placeholderData: keepPreviousData,
  })

export const postQuery = (id: number) =>
  queryOptions({
    queryKey: ['posts', id],
    queryFn: ({ signal }) => getJson<Post>(`posts/${id}`, signal),
  })

export const postCommentsQuery = (postId: number) =>
  queryOptions({
    queryKey: ['posts', postId, 'comments'],
    queryFn: ({ signal }) => getJson<Comment[]>(`posts/${postId}/comments`, signal),
  })

export const commentsQuery = (page: number) =>
  queryOptions({
    queryKey: ['comments', 'page', page],
    queryFn: ({ signal }) => getPage<Comment>('comments', page, PAGE_SIZE.comments, signal),
    placeholderData: keepPreviousData,
  })

export const albumsQuery = (page: number) =>
  queryOptions({
    queryKey: ['albums', 'page', page],
    queryFn: ({ signal }) => getPage<Album>('albums', page, PAGE_SIZE.albums, signal),
    placeholderData: keepPreviousData,
  })

export const albumQuery = (id: number) =>
  queryOptions({
    queryKey: ['albums', id],
    queryFn: ({ signal }) => getJson<Album>(`albums/${id}`, signal),
  })

export const albumPhotosQuery = (albumId: number) =>
  queryOptions({
    queryKey: ['albums', albumId, 'photos'],
    queryFn: ({ signal }) => getJson<Photo[]>(`albums/${albumId}/photos`, signal),
  })

/** The first photo of an album, for the cover on the album cards. */
export const albumCoverQuery = (albumId: number) =>
  queryOptions({
    queryKey: ['albums', albumId, 'cover'],
    queryFn: async ({ signal }) =>
      (await getPage<Photo>(`albums/${albumId}/photos`, 1, 1, signal)).items[0] ?? null,
  })

export const photosQuery = (page: number) =>
  queryOptions({
    queryKey: ['photos', 'page', page],
    queryFn: ({ signal }) => getPage<Photo>('photos', page, PAGE_SIZE.photos, signal),
    placeholderData: keepPreviousData,
  })

export const photoQuery = (id: number) =>
  queryOptions({
    queryKey: ['photos', id],
    queryFn: ({ signal }) => getJson<Photo>(`photos/${id}`, signal),
  })

export const usersQuery = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: ({ signal }) => getJson<User[]>('users', signal),
  })

export const userQuery = (id: number) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: ({ signal }) => getJson<User>(`users/${id}`, signal),
  })

export const userPostsQuery = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId, 'posts'],
    queryFn: ({ signal }) => getJson<Post[]>(`users/${userId}/posts`, signal),
  })

export const userAlbumsQuery = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId, 'albums'],
    queryFn: ({ signal }) => getJson<Album[]>(`users/${userId}/albums`, signal),
  })

export const userTodosQuery = (userId: number) =>
  queryOptions({
    queryKey: ['users', userId, 'todos'],
    queryFn: ({ signal }) => getJson<Todo[]>(`users/${userId}/todos`, signal),
  })

export const todosQuery = (page: number) =>
  queryOptions({
    queryKey: ['todos', 'page', page],
    queryFn: ({ signal }) => getPage<Todo>('todos', page, PAGE_SIZE.todos, signal),
    placeholderData: keepPreviousData,
  })
