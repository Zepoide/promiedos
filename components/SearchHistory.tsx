import { userStore } from "@/store/userStore";
import { FlatList } from "react-native-gesture-handler";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SearchHistroyItem } from "@/store/userStore";
import { Pressable, Image } from "react-native";
import { countries } from "@/constants/Countries";
import { useRouter } from "expo-router";
import Icon from "./Icon";

export default function SearchHistory({
  filter,
}: {
  filter?: "teams" | "competitions";
}) {
  const { searchHistory, removeFromSearchHistory } = userStore();
  const router = useRouter();

  if (
    (filter && !searchHistory[filter].length) ||
    !searchHistory.teams.length
  ) {
    return (
      <ThemedText className="text-lg font-bold">
        No recent {filter && filter + " "}searches
      </ThemedText>
    );
  }

  const renderItem = ({ item }: { item: SearchHistroyItem }) => {
    const type = item.id.includes("competitor") ? "teams" : "competitions";
    const handlePress = () => {
      router.push({
        pathname: `/(details)/${type === "teams" ? "team" : "competition"}/[id]`,
        params: { id: item.id },
      });
    };
    return (
      <Pressable onPress={handlePress}>
        <ThemedView
          type="secondary"
          className="flex-row w-full  justify-between items-center p-2 rounded-lg mb-2"
        >
          <Image
            source={{
              uri: item.logo || undefined,
            }}
            style={{ width: 40, height: 40 }}
            defaultSource={require("@/assets/images/logo-placeholder.png")}
            resizeMode="contain"
          />
          <ThemedView className="flex-col ml-2 flex-1">
            <ThemedText className="text-lg font-semibold">
              {item.name}
            </ThemedText>
            <ThemedText className="text-sm  text-gray-500">
              {countries[item.country as keyof typeof countries]}
            </ThemedText>
          </ThemedView>
          <Pressable onPress={() => removeFromSearchHistory(item, type)}>
            <Icon name="close-outline" size={20} />
          </Pressable>
        </ThemedView>
      </Pressable>
    );
  };

  return (
    <>
      <ThemedText className="text-lg font-bold mb-2">Recent</ThemedText>
      <FlatList
        data={
          filter
            ? searchHistory[filter]
            : searchHistory.teams.concat(searchHistory.competitions)
        }
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        bounces={false}
      />
    </>
  );
}
