import { useEffect, useState } from "react";

export interface Standing {
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

export default function useStandings(): Standing[] | null {
  const [standings, setStandings] = useState(null);

  const fetchStandings = async () => {
    const response = await fetch("http://192.168.0.151:8080/standings");
    const data = await response.json();
    console.log(data);
    setStandings(data);
  };

  useEffect(() => {
    fetchStandings();
  }, []);

  return standings;
}
