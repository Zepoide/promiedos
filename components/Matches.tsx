import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Match } from "../types";
import { Colors } from "@/constants/Colors";

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
};

const { width } = Dimensions.get("window");

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
                <ThemedText style={styles.textTeamName}>
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
                <ThemedText style={styles.score}>
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
                <ThemedText style={styles.textTeamName}>
                  {awayTeam.shortName}
                </ThemedText>
              </View>
            </ThemedView>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  matchInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    maxWidth: "100%",
    borderRadius: 5,
    textAlign: "center",
    marginVertical: 5,
    padding: 10,
    gap: 30,
  },
  teamName: {
    width: "40%",
    // flex: 1,
  },
  textTeamName: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
  score: {
    fontSize: width * 0.045,
    textAlign: "center",
  },
  teamLogo: {
    width: 30,
    height: 30,
  },
});
