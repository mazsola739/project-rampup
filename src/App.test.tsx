import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PORTFOLIO_URL, REPO_URL } from './site.ts'
import { renderApp } from './test/renderApp.tsx'

describe('layout', () => {
  it('opens on the posts and links back to the portfolio', async () => {
    const { router } = renderApp('/')
    expect(await screen.findByRole('heading', { name: 'Posts' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/posts')

    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByText(/ramp-up task before my/i)).toHaveTextContent('February 2022')
    expect(within(footer).getByRole('link', { name: 'mazsola739' })).toHaveAttribute(
      'href',
      PORTFOLIO_URL,
    )
    expect(within(footer).getByRole('link', { name: /source code/i })).toHaveAttribute(
      'href',
      REPO_URL,
    )
  })

  it('switches to the dark theme and remembers it', async () => {
    renderApp('/posts')
    await userEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('project-rampup:theme')).toBe('dark')
    await userEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('shows a 404 page for an unknown address', async () => {
    renderApp('/nope')
    expect(
      await screen.findByRole('heading', { name: 'This page is not here' }),
    ).toBeInTheDocument()
  })
})

describe('posts', () => {
  it('pages through the posts with the page in the URL', async () => {
    const { router } = renderApp('/posts')
    expect(await screen.findByText('post title 1')).toBeInTheDocument()
    expect(screen.queryByText('post title 7')).not.toBeInTheDocument()

    const pages = screen.getByRole('navigation', { name: 'Posts pages' })
    await userEvent.click(within(pages).getByRole('button', { name: 'Page 2' }))

    expect(await screen.findByText('post title 7')).toBeInTheDocument()
    expect(router.state.location.search).toBe('?page=2')
    expect(within(pages).getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('opens a post with its author and its comments', async () => {
    renderApp('/posts')
    await screen.findByText('post title 1')
    await userEvent.click(screen.getByRole('link', { name: 'Read post: post title 1' }))

    expect(await screen.findByRole('heading', { name: 'post title 1' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Comments (3)' })).toBeInTheDocument()
    expect(screen.getByText('comment name 2')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /by user1/ })).toHaveAttribute('href', '/users/1')
  })

  it('shows a 404 for a post that does not exist', async () => {
    renderApp('/posts/999')
    expect(
      await screen.findByRole('heading', { name: 'This post is not here' }),
    ).toBeInTheDocument()
  })
})

describe('users', () => {
  it('shows a user with their posts, albums and todos', async () => {
    renderApp('/users/1')
    expect(await screen.findByRole('heading', { name: 'user1' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Posts (7)' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Albums (1)' })).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: 'Todos (1 / 2 done)' })).toBeInTheDocument()
  })
})

describe('albums', () => {
  it('shows the photos of an album and opens one', async () => {
    renderApp('/albums/1')
    expect(await screen.findByRole('heading', { name: 'album title 1' })).toBeInTheDocument()
    await userEvent.click(await screen.findByRole('link', { name: 'photo title 2' }))
    expect(await screen.findByRole('heading', { name: 'photo title 2' })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'album title 1' })).toHaveAttribute(
      'href',
      '/albums/1',
    )
  })
})
