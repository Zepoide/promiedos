import { Team } from "@/types/types"; 
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";

interface UseTeamResult {
  teamInfo: Team | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useTeam(id: string): UseTeamResult {
  const {
    data: teamInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["team", id],
    queryFn: () => apiService.get(`/team/${id}`),
  });

  return { teamInfo, isLoading, error };
}
