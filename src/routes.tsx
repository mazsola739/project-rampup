import { Navigate, type RouteObject } from 'react-router'
import { Layout } from './components/Layout.tsx'
import { Album } from './pages/Album.tsx'
import { Albums } from './pages/Albums.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { Photo } from './pages/Photo.tsx'
import { Post } from './pages/Post.tsx'
import { Posts } from './pages/Posts.tsx'
import { User } from './pages/User.tsx'
import { Users } from './pages/Users.tsx'

/** The same routes as in 2022, plus a 404 page. */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Navigate replace to="/posts" /> },
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:id', element: <Post /> },
      { path: 'albums', element: <Albums /> },
      { path: 'albums/:id', element: <Album /> },
      { path: 'photos/:id', element: <Photo /> },
      { path: 'users', element: <Users /> },
      { path: 'users/:id', element: <User /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
