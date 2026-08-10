import { useTheme } from './layout/ThemeContext';

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

export default function App() {
  const { isDark } = useTheme()
  return (
    <div className="flex flex-col gap-5">
      <MatchResultCard isDark={isDark} />
      <StandingsTable isDark={isDark} />
    </div>
  )
}
