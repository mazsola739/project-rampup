# Project Ramp-up

**Awesome site**: a small browser for the posts, albums, photos, users and todos of the
[JSONPlaceholder](https://jsonplaceholder.typicode.com) fake REST API.

**Live:** <https://mazsola739.github.io/project-rampup/> · **Portfolio:** <https://mazsola739.github.io/mazsola739/>

It was my ramp-up task from my EPAM days: in February 2022, before joining my first project as a junior
developer, I built it with React 17, React Query 3 and Sass in two weeks. In 2026 I rebuilt it with today's
tools and finished what was left open back then. The commits from 2022 are still here, the original state is
tagged [`v2022`](../../tree/v2022).

## Features

- **Posts**: paged cards with the author, a post page with its comments, and the latest comments on the side
- **Albums**: paged cards with a cover photo, an album page with all its photos, a photo page with previous / next
- **Users**: cards with the drawn avatars, a profile page with the user's posts, albums and todos
- The page number is in the address (`#/posts?page=3`), so a page can be shared and the back button works
- The next page loads while the current one stays on screen; every list has a loading and an error state
- Light and dark theme, works on phones, keyboard and screen reader friendly
- 404 page for unknown addresses and for posts, albums, photos or users that do not exist

### What changed since 2022

| 2022                               | 2026                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| Create React App 5, Yarn           | Vite 8, Bun                                                                             |
| React 17, React Router 6           | React 19, React Router 7 (hash routing for GitHub Pages)                                |
| React Query 3 + Axios              | TanStack Query 5 + `fetch`, all queries in one place                                    |
| Sass, BEM class names              | Tailwind CSS 4, the same grey palette, plus a dark theme                                |
| Google Fonts from Google's servers | Self-hosted fonts (Fontsource), no outside requests for them                            |
| One skipped test                   | 21 tests with Vitest and Testing Library                                                |
| `TODO`s, Pagination never wired in | Comments on the post page, posts / albums / todos on the profile, pagination everywhere |
| —                                  | Biome lint and format, GitHub Actions deploy to GitHub Pages                            |

## Stack

React 19 · TypeScript · [TanStack Query 5](https://tanstack.com/query) · [React Router 7](https://reactrouter.com) ·
[Tailwind CSS 4](https://tailwindcss.com) · [Vite](https://vite.dev) · [Vitest](https://vitest.dev) +
Testing Library · [Biome](https://biomejs.dev) · [Bun](https://bun.sh)

## Run locally

```bash
bun install
bun run dev
```

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `bun run dev`       | dev server with hot reload                            |
| `bun run build`     | type check + production build into `dist/`            |
| `bun run preview`   | serve the production build locally                    |
| `bun run test`      | unit and component tests (Vitest, happy-dom)          |
| `bun run typecheck` | TypeScript check only                                 |
| `bun run lint`      | Biome: lint, formatting, import order and class order |
| `bun run format`    | apply every safe Biome fix and format the code        |

## Project structure

```
src/
  api/          fetch client, JSONPlaceholder types, every query of the app (queries.ts)
  components/   layout, pagination, cards, avatars, theme toggle, small UI pieces
  pages/        Posts, Post, Albums, Album, Photo, Users, User, NotFound
  assets/       header photo and the 10 user avatars from 2022
  test/         test setup and a small fake JSONPlaceholder for the tests
```

## Deployment

Every push to `main` is linted, type checked, tested, built and published by
`.github/workflows/deploy.yml`. One-time setup in the repository: **Settings → Pages → Source: GitHub Actions**.

The app reads its data live from JSONPlaceholder (the photos come from [Lorem Picsum](https://picsum.photos)).

## License

[MIT](LICENSE)
