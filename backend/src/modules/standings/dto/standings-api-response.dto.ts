export interface StandingsApiTeam {
  id: number;
  name: string;
}

export interface StandingsApiTableRow {
  position: number;
  team: StandingsApiTeam;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string | null;
}

export interface StandingsApiGroup {
  stage: string;
  type: 'TOTAL' | 'HOME' | 'AWAY';
  table: StandingsApiTableRow[];
}

export interface StandingsApiResponse {
  standings: StandingsApiGroup[];
}
