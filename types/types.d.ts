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

type CompetitionDetails = {
  id: string;
  name: string;
  country: string;
  logo: string | null;
  standings: Standings[];
  matches: ?Match[];
};

type Standings = {
  id: number;
  competitionId: string;
  teamId: string;
  position: number;
  played: number;
  win: number;
  loss: number;
  draw: number;
  goals_for: number;
  goals_against: number;
  points: number;
  form: string;
};
