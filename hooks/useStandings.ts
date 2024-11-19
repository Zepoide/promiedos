import { useQuery } from "@tanstack/react-query";
import { Standings } from "@/types/types";
import apiService from "@/services/api.service";

interface UseStandingsResult {
    standings: Standings[] | undefined;
    isLoading: boolean;
    error: Error | null;
}

export default function useStandings(id: string): UseStandingsResult {
    const {
        data: standings,
        isLoading,
        error,
    } = useQuery<Standings[]>({
        queryKey: ["standings", id],
        queryFn: () => apiService.get(`/competition/${id}/standings`),
    });
    return { standings, isLoading, error };
}
