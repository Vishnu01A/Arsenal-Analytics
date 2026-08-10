import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import AppLayout from './layout/AppLayout'
import { SidebarProvider } from './layout/SidebarContext'
import { ThemeProvider } from './layout/ThemeContext'
import App from './App'
import StandingsPage from './features/standings/StandingsPage'
import SquadPage from './features/players/SquadPage'
import InjuriesPage from './features/injuries/InjuriesPage'

const Placeholder = ({ title }: { title: string }) => (
  <p className="text-gray-400 text-sm">{title} — coming soon</p>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true,              element: <App /> },
      { path: 'standings',        element: <StandingsPage /> },
      { path: 'squad',            element: <SquadPage /> },
      { path: 'injuries',         element: <InjuriesPage /> },
      { path: 'competitions',     element: <Placeholder title="Competitions" /> },
      { path: 'h2h',              element: <Placeholder title="Head to Head" /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
  </StrictMode>,
)
