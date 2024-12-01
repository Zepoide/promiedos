import { useLocalSearchParams } from "expo-router";
import Container from "@/components/Container";
import { ThemedText } from "@/components/ThemedText";
import useCompetition from "@/hooks/useCompetition";
import { ThemedView } from "@/components/ThemedView";
import { Image } from "react-native";
import { countries } from "@/constants/Countries";
import CustomTabView from "@/components/CustomTabView";
import BackButton from "@/components/BackButton";
import { useState } from "react";
import FollowButton from "@/components/FollowButton";
import TableStandings from "@/pages/TableStandings";
import apiService from "@/services/api.service";
// import { useAuthorizedUser } from "@/hooks/useUser";
import { userStore } from "@/store/userStore";

import CompetitionFixtures from "@/pages/CompetitionFixtures";
import { ActivityIndicator } from "react-native";

const CompetitionDetails = () => {
  const { id } = useLocalSearchParams();
  const competitionId = Array.isArray(id) ? id[0] : id;
  const { competitionInfo, isLoading } = useCompetition(competitionId);
  const { user, follow, unfollow } = userStore();
  const [following, setFollowing] = useState(
    user!.followedCompetitions.some(({ id }) => id === competitionId)
  );

  const followCompetition = async () => {
    try {
      if (following) {
        await unfollow(competitionId, "competition");
      } else {
        await follow(competitionId, "competition");
      }
      setFollowing(!following);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="green" />
      </Container>
    );
  }
  if (!competitionInfo) {
    return (
      <Container>
        <ThemedText>Error loading competition</ThemedText>
      </Container>
    );
  }

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
              uri: competitionInfo.logo,
            }}
            defaultSource={require("@/assets/images/logo-placeholder.png")}
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
        tabs={["Table", "Fixtures"]}
        pages={[
          () => <TableStandings competitionId={competitionId} />,
          () => <CompetitionFixtures competitionId={competitionId} />,
        ]}
      />
    </Container>
  );
};

export default CompetitionDetails;
