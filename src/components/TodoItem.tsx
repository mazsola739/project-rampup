import type { Todo } from '../api/types.ts'
import { UserBadge } from './UserBadge.tsx'

/** A todo with a done / open mark (it was "Completed? YES / NO" in 2022). */
export function TodoItem({ todo, showUser = false }: { todo: Todo; showUser?: boolean }) {
  return (
    <li className="flex gap-3 rounded-xl border border-line bg-card p-3 text-sm">
      <span
        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border text-xs font-bold ${
          todo.completed ? 'border-bar bg-bar text-bar-ink' : 'border-line'
        }`}
        aria-hidden="true"
      >
        {todo.completed ? '✓' : ''}
      </span>
      <div className="flex min-w-0 flex-col gap-1.5">
        <p className={`first-letter:uppercase ${todo.completed ? 'text-muted line-through' : ''}`}>
          {todo.title}
          <span className="sr-only">{todo.completed ? ' (done)' : ' (open)'}</span>
        </p>
        {showUser && <UserBadge userId={todo.userId} />}
      </div>
    </li>
  )
}
