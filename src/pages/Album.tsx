import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { albumPhotosQuery, albumQuery } from '../api/queries.ts'
import { BackLink } from '../components/BackLink.tsx'
import { UserBadge } from '../components/UserBadge.tsx'
import { ErrorMessage, isNotFound, Loading, Skeleton, Title } from '../components/ui.tsx'
import { useIdParam } from '../components/useIdParam.ts'
import { NotFound } from './NotFound.tsx'

export function Album() {
  const id = useIdParam()
  const album = useQuery({ ...albumQuery(id), enabled: id > 0 })
  const photos = useQuery({ ...albumPhotosQuery(id), enabled: album.isSuccess })

  if (!id) return <NotFound what="album" />
  if (album.isPending) return <Loading label="Loading the album…" />
  if (isNotFound(album.error)) return <NotFound what="album" />
  if (album.isError) return <ErrorMessage error={album.error} onRetry={() => album.refetch()} />

  return (
    <div className="flex flex-col gap-5">
      <BackLink to="/albums">All albums</BackLink>
      <Title>
        <span className="block first-letter:uppercase">{album.data.title}</span>
      </Title>
      <UserBadge userId={album.data.userId} size="md" />
      {photos.isError && <ErrorMessage error={photos.error} onRetry={() => photos.refetch()} />}
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
        {photos.data ? (
          photos.data.map((photo) => (
            <li key={photo.id}>
              <Link
                to={`/photos/${photo.id}`}
                className="block overflow-hidden rounded-xl border border-line transition-transform hover:scale-105"
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </Link>
            </li>
          ))
        ) : (
          <Skeleton count={16} className="aspect-square" />
        )}
      </ul>
    </div>
  )
}
