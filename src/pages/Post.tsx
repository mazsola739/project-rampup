import { useQuery } from '@tanstack/react-query'
import { postCommentsQuery, postQuery } from '../api/queries.ts'
import { BackLink } from '../components/BackLink.tsx'
import { UserBadge } from '../components/UserBadge.tsx'
import { ErrorMessage, isNotFound, Loading, Title } from '../components/ui.tsx'
import { useIdParam } from '../components/useIdParam.ts'
import { NotFound } from './NotFound.tsx'

export function Post() {
  const id = useIdParam()
  const post = useQuery({ ...postQuery(id), enabled: id > 0 })
  const comments = useQuery({ ...postCommentsQuery(id), enabled: post.isSuccess })

  if (!id) return <NotFound what="post" />
  if (post.isPending) return <Loading label="Loading the post…" />
  if (isNotFound(post.error)) return <NotFound what="post" />
  if (post.isError) return <ErrorMessage error={post.error} onRetry={() => post.refetch()} />

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-5">
      <BackLink to="/posts">All posts</BackLink>
      <Title as="h2">
        <span className="block first-letter:uppercase">{post.data.title}</span>
      </Title>
      <UserBadge userId={post.data.userId} size="md" />
      <p className="text-lg leading-relaxed whitespace-pre-line first-letter:uppercase">
        {post.data.body}
      </p>

      <section className="mt-4 flex flex-col gap-3" aria-labelledby="comments-title">
        <h3 id="comments-title" className="font-script text-3xl">
          Comments{comments.data ? ` (${comments.data.length})` : ''}
        </h3>
        {comments.isPending && <Loading label="Loading the comments…" />}
        {comments.isError && (
          <ErrorMessage error={comments.error} onRetry={() => comments.refetch()} />
        )}
        <ul className="grid gap-3">
          {comments.data?.map((comment) => (
            <li key={comment.id} className="rounded-xl border border-line bg-card p-4">
              <p className="font-semibold first-letter:uppercase">{comment.name}</p>
              <p className="mt-1 text-xs text-muted">{comment.email.toLowerCase()}</p>
              <p className="mt-2 text-sm first-letter:uppercase">{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
