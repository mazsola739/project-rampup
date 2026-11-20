import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router'
import { PAGE_SIZE, todosQuery, usersQuery } from '../api/queries.ts'
import { Avatar } from '../components/Avatar.tsx'
import { Pagination } from '../components/Pagination.tsx'
import { pageCount } from '../components/paging.ts'
import { TodoItem } from '../components/TodoItem.tsx'
import { Card, ErrorMessage, Skeleton, Title } from '../components/ui.tsx'
import { WithAside } from '../components/WithAside.tsx'

export function Users() {
  const users = useQuery(usersQuery())

  return (
    <WithAside aside={<LatestTodos />}>
      <Title>Users</Title>
      {users.isError ? (
        <ErrorMessage error={users.error} onRetry={() => users.refetch()} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2" aria-busy={users.isFetching}>
          {users.data ? (
            users.data.map((user) => (
              <Card key={user.id} className="relative">
                <div className="flex items-center gap-3">
                  <Avatar userId={user.id} />
                  <div className="min-w-0">
                    <h3 className="font-script text-3xl leading-none">
                      <Link
                        to={`/users/${user.id}`}
                        className="after:absolute after:inset-0 hover:underline"
                      >
                        {user.username}
                      </Link>
                    </h3>
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                  </div>
                </div>
                <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 text-sm">
                  <dt className="text-muted">Email</dt>
                  <dd className="truncate">{user.email.toLowerCase()}</dd>
                  <dt className="text-muted">Phone</dt>
                  <dd className="truncate">{user.phone}</dd>
                  <dt className="text-muted">City</dt>
                  <dd className="truncate">{user.address.city}</dd>
                  <dt className="text-muted">Company</dt>
                  <dd className="truncate">{user.company.name}</dd>
                </dl>
              </Card>
            ))
          ) : (
            <Skeleton count={6} className="h-48" />
          )}
        </div>
      )}
    </WithAside>
  )
}

/** The side column of the users: all todos, paged on their own. */
function LatestTodos() {
  const [page, setPage] = useState(1)
  const todos = useQuery(todosQuery(page))
  const pages = pageCount(todos.data?.total ?? 0, PAGE_SIZE.todos)

  return (
    <>
      <Title as="h3">Todos</Title>
      {todos.isError ? (
        <ErrorMessage error={todos.error} onRetry={() => todos.refetch()} />
      ) : (
        <ul className={`grid gap-2 ${todos.isPlaceholderData ? 'opacity-60' : ''}`}>
          {todos.data ? (
            todos.data.items.map((todo) => <TodoItem key={todo.id} todo={todo} showUser />)
          ) : (
            <Skeleton count={PAGE_SIZE.todos} className="h-20" />
          )}
        </ul>
      )}
      <Pagination
        label="Todos"
        page={page}
        pages={pages}
        onChange={setPage}
        busy={todos.isPlaceholderData}
        compact
      />
    </>
  )
}
