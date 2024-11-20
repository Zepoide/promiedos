import apiService from "@/services/api.service";
import { MatchDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

interface UseMatcheResult {
  data: MatchDetails | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useMatch(id: string): UseMatcheResult {
  const { data, isLoading, error } = useQuery<MatchDetails>({
    queryKey: [`matches-${id}`],
    queryFn: () => apiService.get(`/matches/${id}`),
  });
  return { data, isLoading, error };
}
