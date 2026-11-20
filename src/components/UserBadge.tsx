import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { userQuery } from '../api/queries.ts'
import { Avatar } from './Avatar.tsx'

/**
 * "by Bret" with the avatar, linking to the user's page. Many cards show the same few users:
 * TanStack Query fetches each user only once and shares the result.
 */
export function UserBadge({ userId, size = 'sm' }: { userId: number; size?: 'sm' | 'md' }) {
  const { data: user } = useQuery(userQuery(userId))
  return (
    <Link
      to={`/users/${userId}`}
      className="relative z-1 inline-flex w-fit items-center gap-2 rounded-full pr-2 text-sm text-muted hover:text-ink hover:underline"
    >
      <Avatar userId={userId} size={size} />
      <span>
        by <strong className="font-semibold">{user?.username ?? '…'}</strong>
      </span>
    </Link>
  )
}
