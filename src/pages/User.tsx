import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { userAlbumsQuery, userPostsQuery, userQuery, userTodosQuery } from '../api/queries.ts'
import { Avatar } from '../components/Avatar.tsx'
import { BackLink } from '../components/BackLink.tsx'
import { TodoItem } from '../components/TodoItem.tsx'
import { Card, ErrorMessage, isNotFound, Loading, Title } from '../components/ui.tsx'
import { useIdParam } from '../components/useIdParam.ts'
import { NotFound } from './NotFound.tsx'

export function User() {
  const id = useIdParam()
  const user = useQuery({ ...userQuery(id), enabled: id > 0 })
  const posts = useQuery({ ...userPostsQuery(id), enabled: user.isSuccess })
  const albums = useQuery({ ...userAlbumsQuery(id), enabled: user.isSuccess })
  const todos = useQuery({ ...userTodosQuery(id), enabled: user.isSuccess })

  if (!id) return <NotFound what="user" />
  if (user.isPending) return <Loading label="Loading the user…" />
  if (isNotFound(user.error)) return <NotFound what="user" />
  if (user.isError) return <ErrorMessage error={user.error} onRetry={() => user.refetch()} />

  const { data } = user
  const done = todos.data?.filter((todo) => todo.completed).length ?? 0

  return (
    <div className="flex flex-col gap-6">
      <BackLink to="/users">All users</BackLink>

      <Card className="sm:flex-row sm:items-center sm:gap-6">
        <Avatar userId={data.id} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div>
            <Title>{data.username}</Title>
            <p className="font-semibold">{data.name}</p>
            <p className="text-sm text-muted italic">“{data.company.catchPhrase}”</p>
          </div>
          <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
            <dt className="text-muted">Email</dt>
            <dd className="truncate">
              <a href={`mailto:${data.email.toLowerCase()}`} className="hover:underline">
                {data.email.toLowerCase()}
              </a>
            </dd>
            <dt className="text-muted">Phone</dt>
            <dd className="truncate">{data.phone}</dd>
            <dt className="text-muted">Website</dt>
            <dd className="truncate">{data.website}</dd>
            <dt className="text-muted">Company</dt>
            <dd className="truncate">{data.company.name}</dd>
            <dt className="text-muted">Address</dt>
            <dd className="sm:col-span-3">
              {data.address.street}, {data.address.suite}, {data.address.zipcode}{' '}
              {data.address.city}
            </dd>
          </dl>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="flex flex-col gap-3" aria-labelledby="user-posts">
          <h3 id="user-posts" className="font-script text-3xl">
            Posts{posts.data ? ` (${posts.data.length})` : ''}
          </h3>
          {posts.isPending && <Loading />}
          {posts.isError && <ErrorMessage error={posts.error} onRetry={() => posts.refetch()} />}
          <ul className="grid gap-2">
            {posts.data?.map((post) => (
              <li key={post.id}>
                <Link
                  to={`/posts/${post.id}`}
                  className="block rounded-xl border border-line bg-card p-3 text-sm transition-colors first-letter:uppercase hover:border-accent"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="user-albums">
          <h3 id="user-albums" className="font-script text-3xl">
            Albums{albums.data ? ` (${albums.data.length})` : ''}
          </h3>
          {albums.isPending && <Loading />}
          {albums.isError && <ErrorMessage error={albums.error} onRetry={() => albums.refetch()} />}
          <ul className="grid gap-2">
            {albums.data?.map((album) => (
              <li key={album.id}>
                <Link
                  to={`/albums/${album.id}`}
                  className="block rounded-xl border border-line bg-card p-3 text-sm transition-colors first-letter:uppercase hover:border-accent"
                >
                  {album.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="user-todos">
          <h3 id="user-todos" className="font-script text-3xl">
            Todos{todos.data ? ` (${done} / ${todos.data.length} done)` : ''}
          </h3>
          {todos.isPending && <Loading />}
          {todos.isError && <ErrorMessage error={todos.error} onRetry={() => todos.refetch()} />}
          <ul className="grid gap-2">
            {todos.data?.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
