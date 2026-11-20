import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { albumQuery, photoQuery } from '../api/queries.ts'
import { BackLink } from '../components/BackLink.tsx'
import { UserBadge } from '../components/UserBadge.tsx'
import { ButtonLink, ErrorMessage, isNotFound, Loading, Title } from '../components/ui.tsx'
import { useIdParam } from '../components/useIdParam.ts'
import { NotFound } from './NotFound.tsx'

/** JSONPlaceholder has 5000 photos, numbered from 1. */
const PHOTO_COUNT = 5000

export function Photo() {
  const id = useIdParam()
  const photo = useQuery({ ...photoQuery(id), enabled: id > 0 })
  const albumId = photo.data?.albumId ?? 0
  const album = useQuery({ ...albumQuery(albumId), enabled: albumId > 0 })

  if (!id) return <NotFound what="photo" />
  if (photo.isPending) return <Loading label="Loading the photo…" />
  if (isNotFound(photo.error)) return <NotFound what="photo" />
  if (photo.isError) return <ErrorMessage error={photo.error} onRetry={() => photo.refetch()} />

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-5">
      <BackLink to={`/albums/${photo.data.albumId}`}>Back to the album</BackLink>
      <Title>
        <span className="block first-letter:uppercase">{photo.data.title}</span>
      </Title>
      <figure className="flex flex-col gap-3">
        <img
          src={photo.data.url}
          alt={photo.data.title}
          width={600}
          height={600}
          className="mx-auto aspect-square w-full max-w-xl rounded-2xl border border-line bg-line/40 object-cover shadow-md"
        />
        <figcaption className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <span>
            Photo #{photo.data.id} in{' '}
            <Link to={`/albums/${photo.data.albumId}`} className="font-semibold hover:underline">
              {album.data?.title ?? `album #${photo.data.albumId}`}
            </Link>
          </span>
          {album.data && <UserBadge userId={album.data.userId} />}
        </figcaption>
      </figure>
      <nav aria-label="Photos" className="flex justify-between gap-3">
        {id > 1 ? <ButtonLink to={`/photos/${id - 1}`}>‹ Previous photo</ButtonLink> : <span />}
        {id < PHOTO_COUNT && <ButtonLink to={`/photos/${id + 1}`}>Next photo ›</ButtonLink>}
      </nav>
    </article>
  )
}
