import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import useCompetition from "@/hooks/useCompetition";

const CompetitionDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { competitionInfo, isLoading, error } = useCompetition(id);
  console.log("CompetitionDetails rendered with id:", id);
  return (
    <Container>
      <ThemedText>HOLA</ThemedText>
      <ThemedText>HOLA</ThemedText>
      <ThemedText>HOLA</ThemedText>
      <ThemedText>HOLA</ThemedText>
    </Container>
  );
};

export default CompetitionDetails;
