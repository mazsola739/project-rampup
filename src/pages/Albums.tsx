import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router'
import { albumCoverQuery, albumsQuery, PAGE_SIZE, photosQuery } from '../api/queries.ts'
import { Pagination } from '../components/Pagination.tsx'
import { pageCount } from '../components/paging.ts'
import { UserBadge } from '../components/UserBadge.tsx'
import { Card, ErrorMessage, Skeleton, Title } from '../components/ui.tsx'
import { usePageParam } from '../components/usePageParam.ts'
import { WithAside } from '../components/WithAside.tsx'

export function Albums() {
  const [page, setPage] = usePageParam()
  const albums = useQuery(albumsQuery(page))
  const pages = pageCount(albums.data?.total ?? 0, PAGE_SIZE.albums)

  return (
    <WithAside aside={<LatestPhotos />}>
      <Title>Albums</Title>
      {albums.isError ? (
        <ErrorMessage error={albums.error} onRetry={() => albums.refetch()} />
      ) : (
        <div
          className={`grid gap-4 transition-opacity sm:grid-cols-2 xl:grid-cols-3 ${albums.isPlaceholderData ? 'opacity-60' : ''}`}
          aria-busy={albums.isFetching}
        >
          {albums.data ? (
            albums.data.items.map((album) => (
              <Card key={album.id} flush className="relative">
                <AlbumCover albumId={album.id} />
                <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
                  <h3 className="font-script text-2xl leading-tight first-letter:uppercase">
                    <Link
                      to={`/albums/${album.id}`}
                      className="after:absolute after:inset-0 hover:underline"
                    >
                      {album.title}
                    </Link>
                  </h3>
                  <UserBadge userId={album.userId} />
                </div>
              </Card>
            ))
          ) : (
            <Skeleton count={PAGE_SIZE.albums} className="h-64" />
          )}
        </div>
      )}
      <Pagination
        label="Albums"
        page={page}
        pages={pages}
        onChange={setPage}
        busy={albums.isPlaceholderData}
      />
    </WithAside>
  )
}

/** The first photo of the album as its cover. */
function AlbumCover({ albumId }: { albumId: number }) {
  const { data: photo } = useQuery(albumCoverQuery(albumId))
  // overflow-hidden: without it the square photo stretches the 16:9 box.
  return (
    <div className="aspect-video overflow-hidden bg-line/40">
      {photo && <img src={photo.url} alt="" loading="lazy" className="size-full object-cover" />}
    </div>
  )
}

/** The side column of the albums: all photos, paged on their own. */
function LatestPhotos() {
  const [page, setPage] = useState(1)
  const photos = useQuery(photosQuery(page))
  const pages = pageCount(photos.data?.total ?? 0, PAGE_SIZE.photos)

  return (
    <>
      <Title as="h3">Photos</Title>
      {photos.isError ? (
        <ErrorMessage error={photos.error} onRetry={() => photos.refetch()} />
      ) : (
        <ul
          className={`grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-3 ${photos.isPlaceholderData ? 'opacity-60' : ''}`}
        >
          {photos.data ? (
            photos.data.items.map((photo) => (
              <li key={photo.id}>
                <Link
                  to={`/photos/${photo.id}`}
                  className="block overflow-hidden rounded-full border border-line transition-transform hover:scale-105"
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
            <Skeleton count={PAGE_SIZE.photos} className="aspect-square rounded-full" />
          )}
        </ul>
      )}
      <Pagination
        label="Photos"
        page={page}
        pages={pages}
        onChange={setPage}
        busy={photos.isPlaceholderData}
        compact
      />
    </>
  )
}
