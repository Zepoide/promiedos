import { countries } from "@/constants/Countries";

export interface Stadium {
  id: string;
  name: string;
  capacity: number;
  city_name: string;
  country_name: string;
  map_coordinates: string;
  country_code: string;
  timezone: string;
}

export interface Match {
  id: string;
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  start_time: string; // ISO 8601 format
  round: number;
  scoreHome: number;
  scoreAway: number;
  status: string;
  venue: Stadium;
}

type CountryCode = keyof typeof countries;
export interface CompetitionDetails {
  id: string;
  name: string;
  country: string;
  logo: string | null;
  standings: Standings[];
  matches: ?Match[];
}

export interface Standings {
  competitionId: string;
  draw: number;
  form: string;
  goals_against: number;
  goals_for: number;
  id: number;
  loss: number;
  played: number;
  points: number;
  position: number;
  teamId: string;
  win: number;
}

export interface Competition {
  id: string;
  name: string;
  country: string;
  logo: string | null;
}
export interface GroupedMatches {
  competitionId: string;
  competition: Competition;
  matches: MatchPreview[];
}

export interface MatchPreview {
  id: string;
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  start_time: string; // ISO date string
  scoreHome: number;
  scoreAway: number;
  status: string; // e.g., "closed", "scheduled", etc.
  round: number;
  stadiumId: string;
  competition: Competition;
  homeTeam: {
    name: string;
    logo: string | null;
  };
  awayTeam: {
    name: string;
    logo: string | null;
  };
}
