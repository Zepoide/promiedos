import { CompetitionDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Standings } from "@/types/types";
import apiService from "@/services/api.service";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

interface UseStandingsResult {
  standings: Standings[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useStandings(id: string): UseStandingsResult {
  console.log("useStandings hook called");
  async function fetchCompetitionDetails(id: string): Promise<any> {
    try {
      const response = await fetch(
        `${SERVER_URL}/competition/${id}/standings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching competition details:", error);
      throw new Error("Error fetching competition details");
    }
  }

  const {
    data: standings,
    isLoading,
    error,
  } = useQuery<Standings[]>({
    queryKey: ["competition", id],
    // queryFn: () => fetchCompetitionDetails(id),
    queryFn: () => apiService.get(`/competition/${id}/standings`),
  });
  return { standings, isLoading, error };
}
