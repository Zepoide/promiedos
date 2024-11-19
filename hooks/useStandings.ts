import { Standings } from "@/types/types";
import { useEffect, useState } from "react";

export default function useStandings(): Standings[] | null {
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
