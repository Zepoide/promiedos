import { StyleSheet, Platform } from "react-native"
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { useEffect, useState } from "react"
import { RootObject, Match } from "../types"
import { Colors } from "@/constants/Colors"

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
export default function Matches({ matches }: { matches: Match[] }) {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
      style={styles.container}
    >
      {matches &&
        matches.map(({ id, homeTeam, awayTeam, score }) => {
          return (
            <ThemedView
              key={id}
              style={styles.matchInfo}
              lightColor={Colors["light"].background}
              darkColor={colors.SHARK}
            >
              <View style={styles.teamName}>
                <ThemedText
                  style={{ textAlign: "right" }}
                  type="defaultSemiBold"
                >
                  {homeTeam.shortName}
                </ThemedText>
              </View>
              <View style={styles.teamLogo}>
                <Image
                  source={{ uri: homeTeam.crest }}
                  style={styles.teamLogo}
                />
              </View>
              <View style={{ width: "auto" }}>
                <ThemedText type="defaultSemiBold">
                  {score.fullTime.home} - {score.fullTime.away}
                </ThemedText>
              </View>
              <View style={styles.teamLogo}>
                <Image
                  source={{ uri: awayTeam.crest }}
                  style={styles.teamLogo}
                />
              </View>
              <View style={styles.teamName}>
                <ThemedText
                  style={{ textAlign: "left" }}
                  type="defaultSemiBold"
                >
                  {awayTeam.shortName}
                </ThemedText>
              </View>
            </ThemedView>
          )
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  matchInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    borderRadius: 5,
    textAlign: "center",
    margin: 5,
    padding: 5,
    gap: 20,
  },
  teamName: {
    width: "20%",
    flex: 1,
  },
  score: {
    fontSize: 25,
    textAlign: "auto",
  },
  teamLogo: {
    width: 25,
    height: 25,
  },
})
