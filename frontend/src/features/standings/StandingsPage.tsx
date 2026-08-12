import { useLoaderData, useRouteError } from 'react-router';
import { useTheme } from '../../layout/ThemeContext';
import { API_BASE_URL, CURRENT_SEASON } from '../../lib/api';

interface Standing {
  id: string;
  season: string;
  position: number;
  teamId: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string | null;
}

const ARSENAL_TEAM_ID = 57;

export async function standingsLoader(): Promise<Standing[]> {
  const res = await fetch(`${API_BASE_URL}/standings?season=${CURRENT_SEASON}`);
  if (!res.ok) {
    throw new Response('Failed to load standings', { status: res.status });
  }
  return res.json();
}

const FormDots = ({ form, isDark }: { form: string | null; isDark: boolean }) => {
  if (!form) return <span className="text-gray-500 text-xs">—</span>;

  const results = form.split(',').map((r) => r.trim()).filter(Boolean).slice(-5);
  const colorFor = (result: string) => {
    if (result === 'W') return 'bg-green-500';
    if (result === 'L') return 'bg-red-500';
    return isDark ? 'bg-gray-500' : 'bg-gray-400';
  };

  return (
    <div className="flex gap-1 justify-center">
      {results.map((result, i) => (
        <span key={i} className={`w-2.5 h-2.5 rounded-full ${colorFor(result)}`} title={result} />
      ))}
    </div>
  );
};

const StandingsPage = () => {
  const standings = useLoaderData() as Standing[];
  const { isDark } = useTheme();

  return (
    <div
      className="rounded-xl shadow overflow-hidden"
      style={{ backgroundColor: isDark ? '#2a2d35' : '#ffffff', border: isDark ? 'none' : '1px solid #e5e7eb' }}
    >
      <div className={`px-5 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <h2 className={`font-black tracking-wide text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          PREMIER LEAGUE STANDINGS - {CURRENT_SEASON}/{Number(CURRENT_SEASON) + 1} SEASON
        </h2>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className={`border-b ${isDark ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            {['POS', 'TEAM', 'MP', 'W', 'D', 'L', 'GD', 'PTS', 'FORM'].map((col) => (
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
          {standings.map((team) => {
            const isArsenal = team.teamId === ARSENAL_TEAM_ID;
            return (
              <tr
                key={team.teamId}
                className={`border-b transition-colors ${isDark ? 'border-white/5' : 'border-gray-100'} ${
                  isArsenal
                    ? isDark ? 'bg-red-900/20' : 'bg-red-50'
                    : isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}
              >
                <td className="py-3 px-2 text-center">
                  <div className="flex items-center justify-center">
                    {isArsenal && <span className="w-1 h-5 bg-red-600 rounded mr-2 shrink-0" />}
                    <span className={`font-bold text-xs ${isArsenal ? 'text-red-500' : isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {team.position}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${isArsenal ? 'text-red-500' : isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {team.teamName}
                  </span>
                </td>
                {[team.played, team.won, team.drawn, team.lost, team.goalDifference].map((val, i) => (
                  <td key={i} className={`py-3 px-2 text-center font-medium text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {val > 0 && i === 4 ? `+${val}` : val}
                  </td>
                ))}
                <td className="py-3 px-2 text-center">
                  <span className={`font-black text-sm ${isArsenal ? 'text-red-500' : isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    {team.points}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <FormDots form={team.form} isDark={isDark} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const StandingsErrorBoundary = () => {
  const error = useRouteError();
  const message = error instanceof Response ? `Server responded with ${error.status}` : 'Could not reach the backend';

  return (
    <div className="rounded-xl p-6 border border-red-500/30 bg-red-500/5 text-center">
      <p className="text-red-500 font-semibold text-sm">Failed to load standings</p>
      <p className="text-gray-400 text-xs mt-1">{message}</p>
    </div>
  );
};

export default StandingsPage;
