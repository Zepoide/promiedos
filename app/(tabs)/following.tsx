import Container from "@/components/Container";
import CustomTabView from "@/components/CustomTabView";
import FollowingCard from "@/components/FollowingCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthorizedUser } from "@/hooks/useUser";
import { Team } from "@/types/types";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import FollowedTeams from "@/pages/FollowedTeams";
import FollowedCompetitions from "@/pages/FollowedCompetitions";

const Following = () => {
  const { user } = useAuthorizedUser();

  return (
    <Container>
      <ThemedView
        type="primary"
        className="flex-row justify-between items-center "
      >
        <ThemedText className="text-2xl font-extrabold p-3">
          Following
        </ThemedText>
      </ThemedView>
      <CustomTabView
        tabs={["Teams", "Competition"]}
        pages={[
          () => <FollowedTeams teamsIds={user.followedTeams} />,
          () => (
            <FollowedCompetitions competitionsIds={user.followedCompetitions} />
          ),
        ]}
      />
    </Container>
  );
};

export default Following;
