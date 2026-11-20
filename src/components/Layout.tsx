import { NavLink, Outlet, ScrollRestoration } from 'react-router'
import background from '../assets/background.jpg'
import { PORTFOLIO_URL, REPO_URL } from '../site.ts'
import { GitHubIcon } from './icons.tsx'
import { ThemeToggle } from './ThemeToggle.tsx'

const sections = [
  { to: '/posts', label: 'Posts' },
  { to: '/albums', label: 'Albums' },
  { to: '/users', label: 'Users' },
]

const navLink = ({ isActive }: { isActive: boolean }) =>
  `relative py-3 text-lg transition-colors hover:text-white after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:rounded-full after:transition-transform ${
    isActive ? 'text-white after:scale-x-100 after:bg-current' : 'after:scale-x-0 after:bg-current'
  }`

const footerLink =
  'inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline'

/** The 2022 layout: photo header, grey navigation bar, content, footer. */
export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-card px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <header
        className="relative h-48 bg-cover sm:h-64 lg:h-72"
        style={{ backgroundImage: `url(${background})`, backgroundPosition: '0% 35%' }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-2 sm:px-6">
          <h1 className="font-script text-6xl text-white drop-shadow-[0_2px_6px_rgb(0_0_0/0.5)] sm:text-8xl">
            Awesome site
          </h1>
        </div>
      </header>

      <nav
        aria-label="Main"
        className="sticky top-0 z-20 bg-bar/95 text-bar-ink shadow-md backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-4 sm:gap-8 sm:px-6">
          {sections.map((section) => (
            <NavLink key={section.to} to={section.to} className={navLink}>
              {section.label}
            </NavLink>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <a
              href={PORTFOLIO_URL}
              className="hidden items-center rounded-full border border-current/40 px-3 py-1 text-sm font-semibold transition-colors hover:bg-white/15 sm:inline-flex"
            >
              Portfolio
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="bg-bar text-bar-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center text-sm sm:px-6">
          <p>
            A ramp-up task before my first junior project: built in February 2022, modernized in
            2026.
          </p>
          <p className="opacity-80">
            © 2022–2026 Rika · Data:{' '}
            <a
              href="https://jsonplaceholder.typicode.com"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              JSONPlaceholder
            </a>
          </p>
          <p className="flex gap-5">
            <a href={PORTFOLIO_URL} className={footerLink}>
              mazsola739
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className={footerLink}>
              <GitHubIcon />
              Source code
            </a>
          </p>
        </div>
      </footer>
      <ScrollRestoration />
    </div>
  )
}
