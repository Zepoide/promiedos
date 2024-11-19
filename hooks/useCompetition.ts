import { CompetitionDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";

interface UseCompetitionResult {
  competitionInfo: CompetitionDetails | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useCompetition(id: string): UseCompetitionResult {
  const {
    data: competitionInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["competition", id],
    queryFn: () => apiService.get(`/competition/${id}`),
  });
  return { competitionInfo, isLoading, error };
}
