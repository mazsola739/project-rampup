import { avatars } from '../assets/users/index.ts'

const sizes = { sm: 'size-8', md: 'size-12', lg: 'size-24' } as const

/** The drawn avatar of a user (there is one for each of the 10 users). */
export function Avatar({ userId, size = 'md' }: { userId: number; size?: keyof typeof sizes }) {
  const src = avatars[userId - 1]
  if (!src) {
    return (
      <span
        className={`${sizes[size]} grid shrink-0 place-items-center rounded-full border border-line bg-surface font-semibold text-muted`}
        aria-hidden="true"
      >
        ?
      </span>
    )
  }
  return (
    <img
      className={`${sizes[size]} shrink-0 rounded-full border border-line bg-white object-cover`}
      src={src}
      alt=""
      loading="lazy"
    />
  )
}
