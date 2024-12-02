import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserPayload } from "@/context/AuthContext";
import apiService from "@/services/api.service";
import * as SecureStore from "expo-secure-store";
import { router, useRouter } from "expo-router";

export interface SearchHistroyItem {
  id: string;
  name: string;
  logo?: string;
  country?: string;
}

export interface SearchHistroy {
  teams: SearchHistroyItem[];
  competitions: SearchHistroyItem[];
}

interface AuthState {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
  editUser: (user: UserPayload | null) => void;
  follow: (id: string, type: "team" | "competition") => Promise<void>;
  unfollow: (id: string, type: "team" | "competition") => Promise<void>;
  logout: () => Promise<void>;
  searchHistory: SearchHistroy;
  addToSearchHistory: (
    result: SearchHistroyItem,
    type: "teams" | "competitions"
  ) => void;
  removeFromSearchHistory: (
    result: SearchHistroyItem,
    type: "teams" | "competitions"
  ) => void;
  themePreferance: "dark" | "light";
  toggleThemePreferance: () => void;
}

const secureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const userStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      searchHistory: { teams: [], competitions: [] },
      themePreferance: "dark",
      setUser: (user) => set({ user }),
      editUser: async (data) => {
        const jwt = await secureStorage.getItem("jwt");
        if (!jwt) {
          router.replace("/(auth)/login");
          return;
        }
        const response = await apiService.put("/user/update", data, {
          Authorization: jwt,
        });
        const updatedUser = await response.json();

        set({ user: updatedUser });
      },
      follow: async (id: string, type: "team" | "competition") => {
        const jwt = await secureStorage.getItem("jwt");
        if (!jwt) {
          router.replace("/(auth)/login");
          return;
        }
        const response = await apiService.post(`/follow/${type}/${id}`, {});
        const updatedUser = await response.json();

        set({ user: updatedUser });
      },
      unfollow: async (id: string, type: "team" | "competition") => {
        const jwt = await secureStorage.getItem("jwt");
        if (!jwt) {
          router.replace("/(auth)/login");
          return;
        }
        console.log("unfollowing");
        const response = await apiService.delete(`/follow/${type}/${id}`);
        const updatedUser = await response.json();
        set({ user: updatedUser });
      },
      logout: async () => {
        await SecureStore.deleteItemAsync("jwt");
        set({ user: null, searchHistory: { teams: [], competitions: [] } });
        // router.replace("/(auth)/login");
      },
      addToSearchHistory: (
        result: SearchHistroyItem,
        type: "teams" | "competitions"
      ) => {
        const { searchHistory } = get();
        if (searchHistory[type].some((item) => item.id === result.id)) return;
        const updatedSearchHistory = {
          ...searchHistory,
          [type]: [...searchHistory[type], result],
        };
        set({ searchHistory: updatedSearchHistory });
      },
      removeFromSearchHistory: (
        result: SearchHistroyItem,
        type: "teams" | "competitions"
      ) => {
        const { searchHistory } = get();

        const updatedSearchHistory = {
          ...searchHistory,
          [type]: searchHistory[type].filter((item) => item.id !== result.id),
        };
        set({ searchHistory: updatedSearchHistory });
      },
      toggleThemePreferance: () => {
        const { themePreferance } = get();
        set({ themePreferance: themePreferance === "dark" ? "light" : "dark" });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
