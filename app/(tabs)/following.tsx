import Container from "@/components/Container";
import CustomTabView from "@/components/CustomTabView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { userStore } from "@/store/userStore";
import FollowedTeams from "@/pages/FollowedTeams";
import FollowedCompetitions from "@/pages/FollowedCompetitions";
import Icon from "@/components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

const Following = () => {
  const { user } = userStore();
  if (!user) {
    return (
      <Container>
        <ThemedText className="font-bold text-center text-xl m-auto">
          You do not follow any team
        </ThemedText>
      </Container>
    );
  }

  return (
    <Container>
      <ThemedView
        type="primary"
        className="flex-row justify-between items-center "
      >
        <ThemedText className="text-2xl font-extrabold p-3">
          Following
        </ThemedText>
        <ThemedView className="flex flex-row items-center p-3">
          <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
            <Icon name="add-circle-outline" size={24} />
          </TouchableOpacity>
        </ThemedView>
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
