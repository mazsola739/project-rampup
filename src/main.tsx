import '@fontsource-variable/montserrat'
import '@fontsource/clicker-script'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router'
import { routes } from './routes.tsx'

// JSONPlaceholder's data never changes, so a fetched page stays fresh for 5 minutes.
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
})

// Hash routing: GitHub Pages serves only index.html, so /#/posts/1 works on a reload too.
const router = createHashRouter(routes)

const root = document.getElementById('root')
if (!root) throw new Error('Missing #root element')

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
