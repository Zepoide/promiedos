interface Filters {
  season: number
  stage: string[]
}

interface ResultSet {
  count: number
  first: string
  last: string
  played: number
}

interface Competition {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

interface Area {
  id: number
  name: string
  code: string
  flag: string
}

interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number
  winner: null | string
}

interface Team {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

interface FullTime {
  home: number
  away: number
}

interface HalfTime {
  home: number
  away: number
}

interface Score {
  winner: string
  duration: string
  fullTime: FullTime
  halfTime: HalfTime
}

interface Odds {
  msg: string
}

interface Match {
  area: Area
  competition: Competition
  season: Season
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  group: null | string
  lastUpdated: string
  homeTeam: Team
  awayTeam: Team
  score: Score
  odds: Odds
  referees: any[]
}

export interface RootObject {
  filters: Filters
  resultSet: ResultSet
  competition: Competition
  matches: Match[]
}

export { Match }
