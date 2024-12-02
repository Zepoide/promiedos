import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { flags } from "@/constants/Flags";
import { countries } from "@/constants/Countries";
import MatchPreview from "@/components/MatchPreview";

const DATA = [
  {
    followedTeams: [
      {
        id: "sr:sport_event:51269225",
        start_time: "2024-11-29T19:30:00.000Z",
        scoreHome: null,
        scoreAway: null,
        status: "not_started",
        competition: {
          id: "sr:season:118693",
          name: "Bundesliga",
          country: "DEU",
          logo: "https://crests.football-data.org/BL1.png",
        },
        homeTeam: {
          id: "sr:competitor:2526",
          name: "FC St. Pauli",
          logo: "https://crests.football-data.org/20.png",
        },
        awayTeam: {
          id: "sr:competitor:2573",
          name: "Holstein Kiel",
          logo: "https://crests.football-data.org/720.png",
        },
      },
      {
        id: "sr:sport_event:46657263",
        start_time: "2024-11-30T00:00:00.000Z",
        scoreHome: null,
        scoreAway: null,
        status: "not_started",
        competition: {
          id: "sr:season:114317",
          name: "Liga Profesional",
          country: "ARG",
          logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
        },
        homeTeam: {
          id: "sr:competitor:3206",
          name: "Estudiantes de La Plata",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Escudo_de_Estudiantes_de_La_Plata.svg/125px-Escudo_de_Estudiantes_de_La_Plata.svg.png",
        },
        awayTeam: {
          id: "sr:competitor:3211",
          name: "River Plate",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/129px-Escudo_del_C_A_River_Plate.svg.png",
        },
      },
    ],
    groupedByCompetition: [
      {
        competitionId: "sr:season:118693",
        competition: {
          id: "sr:season:118693",
          name: "Bundesliga",
          country: "DEU",
          logo: "https://crests.football-data.org/BL1.png",
        },
        matches: [
          {
            id: "sr:sport_event:51269225",
            start_time: "2024-11-29T19:30:00.000Z",
            scoreHome: null,
            scoreAway: null,
            status: "not_started",
            competition: {
              id: "sr:season:118693",
              name: "Bundesliga",
              country: "DEU",
              logo: "https://crests.football-data.org/BL1.png",
            },
            homeTeam: {
              id: "sr:competitor:2526",
              name: "FC St. Pauli",
              logo: "https://crests.football-data.org/20.png",
            },
            awayTeam: {
              id: "sr:competitor:2573",
              name: "Holstein Kiel",
              logo: "https://crests.football-data.org/720.png",
            },
          },
        ],
      },
      {
        competitionId: "sr:season:114317",
        competition: {
          id: "sr:season:114317",
          name: "Liga Profesional",
          country: "ARG",
          logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
        },
        matches: [
          {
            id: "sr:sport_event:46657261",
            start_time: "2024-11-29T22:00:00.000Z",
            scoreHome: null,
            scoreAway: null,
            status: "not_started",
            competition: {
              id: "sr:season:114317",
              name: "Liga Profesional",
              country: "ARG",
              logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
            },
            homeTeam: {
              id: "sr:competitor:3201",
              name: "CA San Lorenzo de Almagro",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Escudo_del_Club_Atl%C3%A9tico_San_Lorenzo_de_Almagro.svg/160px-Escudo_del_Club_Atl%C3%A9tico_San_Lorenzo_de_Almagro.svg.png",
            },
            awayTeam: {
              id: "sr:competitor:3203",
              name: "CA Belgrano de Cordoba",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Escudo_Oficial_del_Club_Atl%C3%A9tico_Belgrano.png/190px-Escudo_Oficial_del_Club_Atl%C3%A9tico_Belgrano.png",
            },
          },
          {
            id: "sr:sport_event:46657263",
            start_time: "2024-11-30T00:00:00.000Z",
            scoreHome: null,
            scoreAway: null,
            status: "not_started",
            competition: {
              id: "sr:season:114317",
              name: "Liga Profesional",
              country: "ARG",
              logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
            },
            homeTeam: {
              id: "sr:competitor:3206",
              name: "Estudiantes de La Plata",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Escudo_de_Estudiantes_de_La_Plata.svg/125px-Escudo_de_Estudiantes_de_La_Plata.svg.png",
            },
            awayTeam: {
              id: "sr:competitor:3211",
              name: "River Plate",
              logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/129px-Escudo_del_C_A_River_Plate.svg.png",
            },
          },
        ],
      },
    ],
  },
];

// const listData = [
//   {
//     id: "followed",
//     data: [
//       {
//         id: "sr:sport_event:51269225",
//         start_time: "2024-11-29T19:30:00.000Z",
//         scoreHome: null,
//         scoreAway: null,
//         status: "not_started",
//         competition: {
//           id: "sr:season:118693",
//           name: "Bundesliga",
//           country: "DEU",
//           logo: "https://crests.football-data.org/BL1.png",
//         },
//         homeTeam: {
//           id: "sr:competitor:2526",
//           name: "FC St. Pauli",
//           logo: "https://crests.football-data.org/20.png",
//         },
//         awayTeam: {
//           id: "sr:competitor:2573",
//           name: "Holstein Kiel",
//           logo: "https://crests.football-data.org/720.png",
//         },
//       },
//       {
//         id: "sr:sport_event:46657263",
//         start_time: "2024-11-30T00:00:00.000Z",
//         scoreHome: null,
//         scoreAway: null,
//         status: "not_started",
//         competition: {
//           id: "sr:season:114317",
//           name: "Liga Profesional",
//           country: "ARG",
//           logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_lpf_afa.png",
//         },
//         homeTeam: {
//           id: "sr:competitor:3206",
//           name: "Estudiantes de La Plata",
//           logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Escudo_de_Estudiantes_de_La_Plata.svg/125px-Escudo_de_Estudiantes_de_La_Plata.svg.png",
//         },
//         awayTeam: {
//           id: "sr:competitor:3211",
//           name: "River Plate",
//           logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/129px-Escudo_del_C_A_River_Plate.svg.png",
//         },
//       },
//     ],
//   },
//   {
//     id: "sr:season:118693",
//     data: matches,
//   },
// ];

// const router = useRouter();

const listData = [
  { id: "followed", data: DATA[0].followedTeams },
  ...DATA[0].groupedByCompetition.map((item) => ({
    id: item.competitionId,
    competition: item.competition,
    data: item.matches,
  })),
];

const renderSectionHeader = ({ section }: any) => {
  console.log("section", JSON.stringify(section, null, 2));
  if (section.id === "followed") {
    return (
      <ThemedView
        type="secondary"
        className={`flex flex-row p-3 justify-between items-center ${true ? "rounded-t-lg" : "rounded-lg"} `}
      >
        <ThemedView className="flex flex-row justify-center items-center">
          <ThemedText className="font-extrabold text-l">★</ThemedText>
          <ThemedText className="ml-2 font-extrabold text-l">
            Following
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }
  return (
    <ThemedView
      type="secondary"
      className={`flex flex-row p-3 justify-between items-center rounded-t-lg  `}
    >
      <Pressable
      // onPress={() => {
      //   router.push({
      //     pathname: "/(details)/competition/[id]",
      //     params: { id: section.competition.id },
      //   });
      // }}
      >
        <ThemedView className="flex flex-row justify-center items-center">
          <Image
            style={{ width: 16, height: 16 }}
            source={flags[section.competition.country as keyof typeof flags]}
          />

          <ThemedText className="ml-2 font-extrabold text-l">
            {countries[section.competition.country as keyof typeof countries]} -{" "}
            {section.competition.name}
          </ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SectionList
        sections={listData}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => <MatchPreview match={item}></MatchPreview>}
        renderSectionHeader={renderSectionHeader}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

export default App;
