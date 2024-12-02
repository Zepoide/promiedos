import { GroupedMatches } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

interface UseMatchesResult {
  data: GroupedMatches[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useMatches(date: Date): UseMatchesResult {
  async function fetchMatchPreview(date: Date): Promise<any> {
    try {
      const response = await fetch(`${SERVER_URL}/matches?date=${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + (await SecureStore.getItemAsync("jwt")),
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
      console.error(
        "Error fetching competition details:",
        JSON.stringify(error, null, 2)
      );
      throw new Error("Error fetching competition details");
    }
  }

  const { data, isLoading, error } = useQuery<GroupedMatches[]>({
    queryKey: [`matches-${date}`],
    queryFn: () => fetchMatchPreview(date),
  });
  return { data, isLoading, error };
}
