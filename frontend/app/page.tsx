export default async function Home() {
  // 1. Fetch data from your FastAPI backend
  const response = await fetch("http://127.0.0.1:8000/standings", { cache: 'no-store' });
  const standings = await response.json();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-red-600 mb-6 border-b-4 border-red-600 pb-2">
          Premier League Table
        </h1>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4">Pos</th>
                <th className="p-4">Club</th>
                <th className="p-4">Pts</th>
                <th className="p-4">PL</th>
                <th className="p-4">GD</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team: any) => (
                <tr key={team.id} className="border-b hover:bg-gray-50 transition-colors text-gray-900 font-bold">
                  <td className="p-4">{team.position}</td>
                  <td className={`p-4 ${team.club === 'Arsenal' ? 'text-red-600' : ''}`}>
                    {team.club}
                  </td>
                  <td className="p-4">{team.points}</td>
                  <td className="p-4">{team.played}</td>
                  <td className="p-4">{team.goal_difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}