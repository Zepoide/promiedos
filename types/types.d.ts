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
