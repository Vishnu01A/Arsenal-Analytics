export interface SquadApiPlayer {
  id: number;
  name: string;
  position: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
}

export interface SquadApiResponse {
  squad: SquadApiPlayer[];
}
