import {
  AuthContext,
  AuthContextType,
  UserPayload,
} from "@/context/AuthContext";
import apiService from "@/services/api.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";

export default function useUser(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useNotAuthorizedUser(): (user: UserPayload) => void {
  const { user, setUser } = useUser();
  useEffect(() => {
    if (user) {
      router.push("/(auth)/login");
      return;
    }
    AsyncStorage.getItem("user").then((user) => {
      if (user) setUser(JSON.parse(user));
    });
  }, [user]);
  return (user: UserPayload) => {
    setUser(user);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };
}

export function useAuthorizedUser(): {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
  editUser: (user: UserPayload | null) => void;
  isLoading: boolean;
} {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.push("/(auth)/login");
      }
      setLoading(false);
    };

    if (!user) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, [user]);

  return {
    user: user as UserPayload,
    setUser,
    editUser: async (data: any) => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (!jwt) throw new Error("Inicia sesión para editar tus datos");
      const response = await apiService.put("/user/update", data, {
        Authorization: jwt,
      });
      const updatedUser = await response.json();

      setUser(updatedUser);
    },
    isLoading: loading,
  };
}
