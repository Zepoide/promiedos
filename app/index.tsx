import { StyleSheet, Platform, useColorScheme } from "react-native"
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native"

import ParallaxScrollView from "@/components/ParallaxScrollView"
import { useEffect, useState } from "react"
import { RootObject, Match } from "@/types"
import Matches from "@/components/Matches"
import { ThemedText } from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"
// import { API_KEY } from "@env"

const API_KEY = String

const colors = {
  WHITE: "#fff",
  BLACK: "#000",
  ALTO: "#dfdfdf",
  GREY: "#808080",
  EBONY_CLAY: "#292d3e",
  HEATHER: "#bfc7d5",
  LYNCH: "#697098",
  SHARK: "#242526",
  SHUTTLE_GREY: "#565E67",
}

export default function HomeScreen() {
  const [matches, setMatches] = useState<Match[]>()
  const colorScheme = useColorScheme()

  const fetchMatches = async () => {
    const url =
      "https://api.football-data.org/v4/competitions/2152/matches?season=2024&stage=LAST_16"

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": API_KEY,
        },
      })
      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`)
      }
      const data: RootObject = await response.json()

      setMatches(data.matches)
    } catch (error) {
      console.error("Error fetching data:", error)
      return undefined
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  return (
    <SafeAreaView
      style={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        flex: 1,
        width: "auto",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ThemedText style={styles.title}>
        PROMIEDOS
      </ThemedText>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors[colorScheme ?? "light"].background
        }}
        style={styles.container}
      >
        {!!matches && <Matches matches={matches}></Matches>}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    flexDirection: "column",
  },
  matchInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "red",
    borderColor: "#333",
    width: "100%",
    textAlign: "center",
    margin: 5,
    padding: 5,
  },
  teamName: { fontSize: 30, textAlign: "center" },
})
