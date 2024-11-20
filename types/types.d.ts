import { countries } from "@/constants/Countries";
import MatchDetails from "../app/(details)/match/[id]";

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
  homeTeam?: {
    logo: string | null;
    name: string;
  };
  awayTeam?: {
    logo: string | null;
    name: string;
  };
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
    team: Team;
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
    matches: IMatchPreview[];
}

export interface IMatchPreview {
  id: string;
  competitionId?: string;
  homeTeamId: string;
  awayTeamId: string;
  start_time: string; // ISO date string
  scoreHome: number;
  scoreAway: number;
  status?: string; // e.g., "closed", "scheduled", etc.
  round?: number;
  stadiumId?: string;
  competition?: Competition;
  homeTeam: {
    name: string;
    logo: string | null;
  };
  awayTeam: {
    name: string;
    logo: string | null;
  };
}

export interface MatchDetails extends Match {
  homeTeam: Team;
  awayTeam: Team;
  stadium: Stadium;
  competition: Competition;
}

export type MatchH2H = {
  id: string;
  competition: string;
  start_time: string;
  home_team: Team;
  away_team: Team;
  scoreHome: number;
  scoreAway: number;
};

type TeamH2H = {
  id: string;
  name: string;
  country: string;
  country_code: string;
  abbreviation: string;
  qualifier: "home" | "away";
  gender: "male" | "female" | "other";
};

interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  managerName: string;
  stadiumId: string;
  logo: string | null;
  primary_color: string;
  secondary_color: string;
  number_color: string;
}

export interface H2HData {
  homeTeam: Team;
  awayTeam: Team;
  lastMatches: MatchH2H[];
}

export interface IMatchInfo {
  id: string;
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  start_time: string; // ISO 8601 formatted string
  scoreHome: number;
  scoreAway: number;
  status: string;
  round: number;
  stadiumId: string;
  competition: {
    id: string;
    name: string;
    country: string;
    logo: string;
  };
  stadium: {
    id: string;
    name: string;
    city: string;
    country: string;
    capacity: number;
  };
}

export interface TeamSummaryResponse {
  team: {
    id: string;
    name: string;
    shortName: string;
    city: string;
    country: string;
    managerName: string;
    stadiumId: string;
    logo: string;
    stadium: {
      id: string;
      name: string;
      city: string;
      country: string;
      capacity: number;
    };
  };
  next_match: {
    id: string;
    competitionId: string;
    homeTeamId: string;
    awayTeamId: string;
    start_time: string; // ISO8601 format
    scoreHome: number | null;
    scoreAway: number | null;
    status: string;
    round: number;
    stadiumId: string;
    homeTeam: {
      logo: string;
      name: string;
    };
    awayTeam: {
      logo: string;
      name: string;
    };
    competition: {
      name: string;
    };
  };
  last_5_matches: {
    id: string;
    competitionId: string;
    homeTeamId: string;
    awayTeamId: string;
    start_time: string; // ISO8601 format
    scoreHome: number | null;
    scoreAway: number | null;
    status: string;
    round: number;
    stadiumId: string;
    homeTeam: {
      logo: string;
      name: string;
    };
    awayTeam: {
      logo: string;
      name: string;
    };
  }[];
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  managerName: string;
  stadiumId: string;
  logo: string;
}
