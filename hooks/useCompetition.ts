import { CompetitionDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

interface UseCompetitionResult {
  competitionInfo: CompetitionDetails | undefined;
  isLoading: boolean;
  error: unknown;
}

export default function useCompetition(id: string): UseCompetitionResult {
  async function fetchCompetitionDetails(id: string): Promise<any> {
    try {
      console.log("fetchCompetitionDetails called with id:", id);
      const response = await fetch(`${SERVER_URL}/competition/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    data: competitionInfo,
    isLoading,
    error,
  } = useQuery<CompetitionDetails>({
    queryKey: ["competition"],
    queryFn: () => fetchCompetitionDetails(id),
  });
  return { competitionInfo, isLoading, error };
}
