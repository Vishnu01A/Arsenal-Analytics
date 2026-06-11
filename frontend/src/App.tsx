import { useState } from 'react'
import './App.css'

const matchData = {
  home: { name: 'ARSENAL', score: 4 },
  away: { name: 'MANCHESTER UNITED', score: 2 },
  status: 'Full Time',
  date: 'SAT 14 FEB 2026, 17:00',
}

const homeStats = [6, 10, 14, 7, 9, 12]
const awayStats = [4, 6, 8, 4, 6, 10]

const standings = [
  { pos: 1, name: 'Arsenal',     mp: 23, w: 18, d: 3, l: 2, gd: 48,  pts: 57, isArsenal: true },
  { pos: 2, name: 'Liverpool',   mp: 23, w: 16, d: 4, l: 3, gd: 32,  pts: 52 },
  { pos: 3, name: 'Brentford',   mp: 23, w: 16, d: 4, l: 3, gd: 29,  pts: 50 },
  { pos: 4, name: 'Man City',    mp: 23, w: 12, d: 5, l: 3, gd: 12,  pts: 48 },
  { pos: 5, name: 'Aston Villa', mp: 23, w: 11, d: 5, l: 4, gd: 11,  pts: 40 },
  { pos: 6, name: 'Southampton', mp: 23, w: 11, d: 5, l: 5, gd: -7,  pts: 38 },
  { pos: 7, name: 'Tottenham',   mp: 23, w:  9, d: 5, l: 4, gd: -2,  pts: 29 },
]

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
)
const IconSquad = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zm-2 3c0 1.65-1.35 3-3 3H10c-1.65 0-3-1.35-3-3V5h10v3z" />
  </svg>
)
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
  </svg>
)
const IconH2H = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" />
  </svg>
)
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
)
const IconBurger = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
  </svg>
)
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42zm13.44 13.44a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42zM3 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm16 0a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1zM4.22 19.78a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0zm13.44-13.44a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0z" />
  </svg>
)
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)
const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const MiniBarChart = ({ homeVals, awayVals }: { homeVals: number[]; awayVals: number[] }) => {
  const max = Math.max(...homeVals, ...awayVals)
  return (
    <div className="flex gap-6 items-end justify-center h-16">
      <div className="flex gap-1 items-end">
        {homeVals.map((v, i) => (
          <div key={i} style={{ height: `${(v / max) * 52}px` }} className="w-4 bg-red-400 rounded-t-sm opacity-80" />
        ))}
      </div>
      <div className="flex flex-col items-center gap-1 pb-1 text-gray-400 text-xs font-bold">
        <span>Stats</span>
        <span>VS</span>
        <span>Stats</span>
      </div>
      <div className="flex gap-1 items-end">
        {awayVals.map((v, i) => (
          <div key={i} style={{ height: `${(v / max) * 52}px` }} className="w-4 bg-gray-400 rounded-t-sm opacity-80" />
        ))}
      </div>
    </div>
  )
}

const navItems = [
  { label: 'HOME',          Icon: IconHome,   active: true  },
  { label: 'SQUAD INFO',    Icon: IconSquad,  active: false },
  { label: 'COMPETITIONS',  Icon: IconTrophy, active: false },
  { label: 'SEASON STATS',  Icon: IconChart,  active: false },
  { label: 'HEAD TO HEAD',  Icon: IconH2H,    active: false },
  { label: 'CUSTOM SEARCH', Icon: IconSearch, active: false },
]

const Sidebar = ({ isOpen }: { isOpen: boolean }) => (
  <aside
    className="shrink-0 flex flex-col overflow-hidden transition-all duration-300 whitespace-nowrap"
    style={{ backgroundColor: '#1c1e24', width: isOpen ? '14rem' : '0' }}
  >
    <nav className="flex-1 py-4">
      {navItems.map(({ label, Icon, active }) => (
        <a
          key={label}
          href="#"
          className={[
            'flex items-center gap-3 px-5 py-3 text-xs font-bold tracking-widest transition-colors',
            active
              ? 'text-white bg-white/10 border-l-2 border-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent',
          ].join(' ')}
        >
          <Icon />
          {label}
        </a>
      ))}
    </nav>

    <div className="py-6 flex flex-col items-center gap-1">
      <a href="#" className="text-gray-400 hover:text-white transition-colors">
        <IconGitHub />
      </a>
      <span className="text-gray-500 text-xs">made by fan</span>
    </div>
  </aside>
)

const MatchResultCard = ({ isDark }: { isDark: boolean }) => (
  <div
    className="rounded-xl overflow-hidden shadow-lg"
    style={{ backgroundColor: isDark ? '#2a2d35' : '#ffffff', border: isDark ? 'none' : '1px solid #e5e7eb' }}
  >
    <div className="px-6 pt-5 pb-2 text-center">
      <h2 className={`font-bold tracking-widest text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
        MOST RECENT MATCH RESULT
      </h2>
    </div>

    <div className="flex items-center justify-between px-8 py-4">
      <div className="flex flex-col items-center gap-2 w-36">
        <span className={`font-bold tracking-wider text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {matchData.home.name}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span className={`text-6xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{matchData.home.score}</span>
          <span className="text-gray-400 text-4xl font-light">-</span>
          <span className={`text-6xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{matchData.away.score}</span>
        </div>
        <span className={`text-xs mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{matchData.status}</span>
        <span className="text-gray-500 text-xs mt-0.5">{matchData.date}</span>
      </div>

      <div className="flex flex-col items-center gap-2 w-36">
        <span className={`font-bold tracking-wider text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {matchData.away.name}
        </span>
      </div>
    </div>

    <div className={`px-8 pb-5 pt-2 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
      <MiniBarChart homeVals={homeStats} awayVals={awayStats} />
    </div>
  </div>
)

const StandingsTable = ({ isDark }: { isDark: boolean }) => (
  <div
    className="rounded-xl shadow overflow-hidden"
    style={{ backgroundColor: isDark ? '#2a2d35' : '#ffffff', border: isDark ? 'none' : '1px solid #e5e7eb' }}
  >
    <div className={`px-5 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
      <h2 className={`font-black tracking-wide text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
        PREMIER LEAGUE STANDINGS - 2025/26 SEASON
      </h2>
    </div>

    <table className="w-full text-sm">
      <thead>
        <tr className={`border-b ${isDark ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
          {['POS', 'TEAM', 'MP', 'W', 'D', 'L', 'GD', 'PTS'].map((col) => (
            <th
              key={col}
              className={`py-3 font-bold text-xs tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'} ${
                col === 'TEAM' ? 'text-left px-4' : 'text-center px-2'
              }`}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {standings.map((team) => (
          <tr
            key={team.pos}
            className={`border-b transition-colors ${isDark ? 'border-white/5' : 'border-gray-100'} ${
              team.isArsenal
                ? isDark ? 'bg-red-900/20' : 'bg-red-50'
                : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
            }`}
          >
            <td className="py-3 px-2 text-center">
              <div className="flex items-center justify-center">
                {team.isArsenal && <span className="w-1 h-5 bg-red-600 rounded mr-2 shrink-0" />}
                <span className={`font-bold text-xs ${team.isArsenal ? 'text-red-500' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {team.pos}
                </span>
              </div>
            </td>

            <td className="py-3 px-4">
              <span className={`font-semibold ${team.isArsenal ? 'text-red-500' : isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {team.name}
              </span>
            </td>

            {[team.mp, team.w, team.d, team.l, team.gd].map((val, i) => (
              <td key={i} className={`py-3 px-2 text-center font-medium text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {val > 0 && i === 4 ? `+${val}` : val}
              </td>
            ))}

            <td className="py-3 px-2 text-center">
              <span className={`font-black text-sm ${team.isArsenal ? 'text-red-500' : isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {team.pts}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const TopNav = ({ onToggle, isDark, onThemeToggle }: { onToggle: () => void; isDark: boolean; onThemeToggle: () => void }) => (
  <header className="relative h-12 flex items-center px-6 shrink-0" style={{ backgroundColor: '#1c1e24', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
    <button onClick={onToggle} className="text-gray-400 hover:text-white transition-colors border border-gray-600 rounded p-1.5 hover:border-gray-400" aria-label="Toggle menu">
      <IconBurger />
    </button>
    <a
      href="#"
      className="absolute left-1/2 -translate-x-1/2 text-white font-black tracking-widest text-[21px] hover:text-red-400 transition-colors"
    >
      GunnerGraphs
    </a>
    <button
      onClick={onThemeToggle}
      className="absolute right-6 text-gray-400 hover:text-white transition-colors border border-gray-600 rounded p-1.5 hover:border-gray-400"
      aria-label="Toggle theme"
    >
      {isDark ? <IconSun /> : <IconMoon />}
    </button>
  </header>
)

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-[#13151a]' : 'bg-gray-100'}`}>
      <TopNav
        onToggle={() => setSidebarOpen(o => !o)}
        isDark={isDark}
        onThemeToggle={() => setIsDark(d => !d)}
      />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-6 flex flex-col gap-5 min-w-0">
          <MatchResultCard isDark={isDark} />
          <StandingsTable isDark={isDark} />
        </main>
      </div>
    </div>
  )
}
