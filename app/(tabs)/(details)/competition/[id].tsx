import { useLocalSearchParams } from "expo-router";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import useCompetition from "@/hooks/useCompetition";
import { ThemedView } from "@/components/ThemedView";
import { Button, Image, Pressable } from "react-native";
import { countries } from "@/constants/Countries";
import CustomTabView from "@/components/CustomTabView";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import FollowButton from "@/components/FollowButton";

const CompetitionDetails = () => {
  const { id } = useLocalSearchParams();
  const competitionId = Array.isArray(id) ? id[0] : id;
  const { competitionInfo, isLoading, error } = useCompetition(competitionId);
  const [following, setFollowing] = useState(false);

  const followCompetition = () => {
    setFollowing(!following);
  };

  if (isLoading) {
    return (
      <Container>
        <ThemedText>Loading...</ThemedText>
      </Container>
    );
  }

  const FirstRoute = () => (
    <ThemedView className="flex-1 items-center justify-center bg-pink-400">
      <ThemedText className="text-white">First Tab Content</ThemedText>
    </ThemedView>
  );

  const SecondRoute = () => (
    <ThemedView className="flex-1 h-[2500px] items-center justify-center bg-purple-700">
      <ThemedText className="text-white">Second Tab Content</ThemedText>
    </ThemedView>
  );

  if (competitionInfo) {
    return (
      <Container>
        <ThemedView className=" flex flex-row justify-between items-center mx-2">
          <BackButton />
          <FollowButton onPress={followCompetition} following={following} />
        </ThemedView>
        <ThemedView className="flex flex-row justify-start m-3 p-3">
          <ThemedView className="basis-1/5">
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
              }}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
          </ThemedView>
          <ThemedView className="flex basis-2/3 justify-start">
            <ThemedText className="text-2xl font-extrabold ">
              {competitionInfo.name}
            </ThemedText>
            <ThemedText className="text-gray-500">
              {countries[competitionInfo.country as keyof typeof countries]}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <CustomTabView
          tabs={[
            "Table",
            "Fixtures",
            "Top Scorers",
            "Teams",
            "Stats",
            "Odds",
            "Predictions",
            "News",
            "Videos",
          ]}
          pages={[
            FirstRoute,
            SecondRoute,
            FirstRoute,
            SecondRoute,
            FirstRoute,
            FirstRoute,
            SecondRoute,
            FirstRoute,
            SecondRoute,
          ]}
        />
      </Container>
    );
  }
};

export default CompetitionDetails;
