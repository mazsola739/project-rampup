import { ButtonLink, Title } from '../components/ui.tsx'

/** 404: for unknown addresses and for posts, albums, photos or users that do not exist. */
export function NotFound({ what = 'page' }: { what?: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-12 text-center">
      <p className="font-script text-8xl text-muted" aria-hidden="true">
        404
      </p>
      <Title as="h2">This {what} is not here</Title>
      <p className="text-muted">Maybe one of the rice-ball cats ate it.</p>
      <ButtonLink to="/posts" className="self-center">
        Go to the posts
      </ButtonLink>
    </div>
  )
}
