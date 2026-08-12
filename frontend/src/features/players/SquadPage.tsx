import { useLoaderData, useRouteError } from 'react-router';
import { useTheme } from '../../layout/ThemeContext';
import { API_BASE_URL, CURRENT_SEASON } from '../../lib/api';

interface SquadPlayer {
  id: string;
  season: string;
  playerId: number;
  name: string;
  position: string | null;
  nationality: string | null;
  dateOfBirth: string | null;
  shirtNumber: number | null;
}

const POSITION_ORDER: Record<string, number> = {
  Goalkeeper: 0,
  Defence: 1,
  Midfield: 2,
  Offence: 3,
};

export async function squadLoader(): Promise<SquadPlayer[]> {
  const res = await fetch(`${API_BASE_URL}/squad?season=${CURRENT_SEASON}`);
  if (!res.ok) {
    throw new Response('Failed to load squad', { status: res.status });
  }
  const players: SquadPlayer[] = await res.json();
  return [...players].sort((a, b) => {
    const orderA = POSITION_ORDER[a.position ?? ''] ?? 99;
    const orderB = POSITION_ORDER[b.position ?? ''] ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name);
  });
}

const SquadPage = () => {
  const players = useLoaderData() as SquadPlayer[];
  const { isDark } = useTheme();

  return (
    <div
      className="rounded-xl shadow overflow-hidden"
      style={{ backgroundColor: isDark ? '#2a2d35' : '#ffffff', border: isDark ? 'none' : '1px solid #e5e7eb' }}
    >
      <div className={`px-5 py-4 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <h2 className={`font-black tracking-wide text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
          ARSENAL SQUAD - {CURRENT_SEASON}/{Number(CURRENT_SEASON) + 1} SEASON
        </h2>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className={`border-b ${isDark ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            {['#', 'NAME', 'POSITION', 'NATIONALITY'].map((col) => (
              <th
                key={col}
                className={`py-3 font-bold text-xs tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'} ${
                  col === 'NAME' ? 'text-left px-4' : 'text-center px-2'
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.playerId}
              className={`border-b transition-colors ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}
            >
              <td className={`py-3 px-2 text-center font-bold text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {player.shirtNumber ?? '—'}
              </td>
              <td className="py-3 px-4">
                <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{player.name}</span>
              </td>
              <td className={`py-3 px-2 text-center text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {player.position ?? '—'}
              </td>
              <td className={`py-3 px-2 text-center text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {player.nationality ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const SquadErrorBoundary = () => {
  const error = useRouteError();
  const message = error instanceof Response ? `Server responded with ${error.status}` : 'Could not reach the backend';

  return (
    <div className="rounded-xl p-6 border border-red-500/30 bg-red-500/5 text-center">
      <p className="text-red-500 font-semibold text-sm">Failed to load squad</p>
      <p className="text-gray-400 text-xs mt-1">{message}</p>
    </div>
  );
};

export default SquadPage;
