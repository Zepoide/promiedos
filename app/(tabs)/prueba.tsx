import React, { useState, useEffect } from "react";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import ThemedInputUser from "@/components/ThemedInputUser";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  View,
  Image,
  Pressable,
} from "react-native";
import { userStore, SearchHistroyItem, SearchHistroy } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api.service";
import { countries } from "@/constants/Countries";
import FollowButton from "@/components/FollowButton";
import { useRouter } from "expo-router";
import SearchHistory from "@/components/SearchHistory";
import SearchPage from "@/pages/SearchPage";

interface SearchResponse {
  teams: SearchHistroyItem[];
  competitions: SearchHistroyItem[];
}

const app = () => {
  return <SearchPage />;
};

export default app;
