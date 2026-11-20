import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router'
import { commentsQuery, PAGE_SIZE, postsQuery } from '../api/queries.ts'
import { Pagination } from '../components/Pagination.tsx'
import { pageCount } from '../components/paging.ts'
import { UserBadge } from '../components/UserBadge.tsx'
import { ButtonLink, Card, ErrorMessage, Skeleton, Title } from '../components/ui.tsx'
import { usePageParam } from '../components/usePageParam.ts'
import { WithAside } from '../components/WithAside.tsx'

export function Posts() {
  const [page, setPage] = usePageParam()
  const posts = useQuery(postsQuery(page))
  const pages = pageCount(posts.data?.total ?? 0, PAGE_SIZE.posts)

  return (
    <WithAside aside={<LatestComments />}>
      <Title>Posts</Title>
      {posts.isError ? (
        <ErrorMessage error={posts.error} onRetry={() => posts.refetch()} />
      ) : (
        <div
          className={`grid gap-4 transition-opacity sm:grid-cols-2 ${posts.isPlaceholderData ? 'opacity-60' : ''}`}
          aria-busy={posts.isFetching}
        >
          {posts.data ? (
            posts.data.items.map((post) => (
              <Card key={post.id}>
                <h3 className="font-script text-2xl leading-tight first-letter:uppercase">
                  {post.title}
                </h3>
                <UserBadge userId={post.userId} />
                <p className="line-clamp-3 text-sm text-muted first-letter:uppercase">
                  {post.body}
                </p>
                <ButtonLink
                  to={`/posts/${post.id}`}
                  className="mt-auto"
                  aria-label={`Read post: ${post.title}`}
                >
                  Read post
                </ButtonLink>
              </Card>
            ))
          ) : (
            <Skeleton count={PAGE_SIZE.posts} className="h-52" />
          )}
        </div>
      )}
      <Pagination
        label="Posts"
        page={page}
        pages={pages}
        onChange={setPage}
        busy={posts.isPlaceholderData}
      />
    </WithAside>
  )
}

/** The side column of the posts: the latest comments, paged on their own. */
function LatestComments() {
  const [page, setPage] = useState(1)
  const comments = useQuery(commentsQuery(page))
  const pages = pageCount(comments.data?.total ?? 0, PAGE_SIZE.comments)

  return (
    <>
      <Title as="h3">Comments</Title>
      {comments.isError ? (
        <ErrorMessage error={comments.error} onRetry={() => comments.refetch()} />
      ) : (
        <ul className={`grid gap-3 ${comments.isPlaceholderData ? 'opacity-60' : ''}`}>
          {comments.data ? (
            comments.data.items.map((comment) => (
              <li key={comment.id} className="rounded-xl border border-line bg-card p-3 text-sm">
                <p className="line-clamp-3 first-letter:uppercase">{comment.body}</p>
                <p className="mt-2 text-xs text-muted">
                  <Link to={`/posts/${comment.postId}`} className="font-semibold hover:underline">
                    on post #{comment.postId}
                  </Link>{' '}
                  · {comment.email.toLowerCase()}
                </p>
              </li>
            ))
          ) : (
            <Skeleton count={PAGE_SIZE.comments} className="h-24" />
          )}
        </ul>
      )}
      <Pagination
        label="Comments"
        page={page}
        pages={pages}
        onChange={setPage}
        busy={comments.isPlaceholderData}
        compact
      />
    </>
  )
}
