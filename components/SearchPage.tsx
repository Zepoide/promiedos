import React, { useState, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { userStore, SearchHistroyItem } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { countries } from "@/constants/Countries";
import FollowButton from "@/components/FollowButton";
import { useRouter } from "expo-router";
import SearchHistory from "@/components/SearchHistory";
import Loader from "@/components/Loader";
import { SafeAreaView } from "react-native-safe-area-context";

interface SearchResponse {
  teams: SearchHistroyItem[];
  competitions: SearchHistroyItem[];
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const { user, follow, unfollow, addToSearchHistory } = userStore();
  const router = useRouter();

  const {
    data: searchResults,
    isLoading,
    refetch,
  } = useQuery<SearchResponse>({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery.length > 0) {
        return apiService.get(
          `/search?query=${debouncedQuery}&filters=${selectedFilter.toLowerCase()}`
        );
      }
      return { teams: [], competitions: [] };
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const filters = ["All", "Teams", "Competitions"];

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  useEffect(() => {
    refetch();
  }, [selectedFilter]);

  const renderItem = ({ item }: { item: SearchHistroyItem }) => {
    const type = item.id.includes("competitor") ? "teams" : "competitions";
    const handlePress = () => {
      router.push({
        pathname: `/(details)/${type === "teams" ? "team" : "competition"}/[id]`,
        params: { id: item.id },
      });
      addToSearchHistory(item, type);
    };
    const followed =
      type === "teams" ? user?.followedTeams : user?.followedCompetitions;
    const following = followed?.some(
      (followedItem) => followedItem.id === item.id
    );

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
          <FollowButton
            following={following}
            onPress={() =>
              following
                ? unfollow(item.id, type === "teams" ? "team" : "competition")
                : follow(item.id, type === "teams" ? "team" : "competition")
            }
          />
        </ThemedView>
      </Pressable>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView type="secondary" className="flex-1 p-2 ">
        <ThemedView className="w-full flex-row justify-center p-2 items-center  rounded-t-xl bg-light-primary dark:bg-dark-primary">
          <Icon name="search-outline" size={24} />
          <TextInput
            className="flex-1 ml-2 text-black dark:text-white"
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={"gray"}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Icon name="close-outline" size={24} />
            </TouchableOpacity>
          )}
        </ThemedView>
        <ThemedView
          type="primary"
          className="flex-row w-full rounded-b-lg justify-start p-2 border-t-2 border-light-secondary dark:border-dark-secondary"
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              className={`p-2 m-1 rounded ${
                selectedFilter === filter
                  ? "bg-black dark:bg-white"
                  : "bg-light-secondary dark:bg-dark-secondary"
              }`}
              onPress={() => handleFilterPress(filter)}
            >
              <ThemedText
                className={`${
                  selectedFilter === filter
                    ? "text-white dark:text-black"
                    : "text-black dark:text-white"
                }`}
              >
                {filter}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
        <ThemedView className="flex-1 w-full p-2">
          {searchQuery.length === 0 && (
            <SearchHistory
              filter={
                selectedFilter === "All"
                  ? undefined
                  : (selectedFilter.toLowerCase() as "teams" | "competitions")
              }
            />
          )}
          {isLoading && <Loader type="secondary" />}
          {searchQuery.length > 0 && searchResults && !isLoading && (
            <FlatList
              data={
                selectedFilter === "Teams"
                  ? searchResults.teams
                  : selectedFilter === "Competitions"
                    ? searchResults.competitions
                    : searchResults.teams?.concat(searchResults.competitions)
              }
              renderItem={renderItem}
              ListEmptyComponent={
                <ThemedText className="font-semibold text-lg text-center">
                  No results
                </ThemedText>
              }
              keyExtractor={(item) => item.id}
              bounces={false}
            />
          )}
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default SearchPage;
