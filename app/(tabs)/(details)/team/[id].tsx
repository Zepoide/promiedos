import { useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import Container from "@/components/Container";
import BackButton from "@/components/BackButton";
import FollowButton from "@/components/FollowButton";

const TeamDetails = () => {
    const [following, setFollowing] = useState(false);

    const followTeam = () => {
        setFollowing(!following);
    };

    const recentMatches = [
        { id: 1, opponent: "River Plate", score: "1-1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/129px-Escudo_del_C_A_River_Plate.svg.png" },
        { id: 2, opponent: "Argentinos Jrs", score: "1-1", logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Asociacion_Atletica_Argentinos_Juniors.svg/160px-Asociacion_Atletica_Argentinos_Juniors.svg.png" },
        { id: 3, opponent: "Belgrano", score: "1-1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Escudo_Oficial_del_Club_Atl%C3%A9tico_Belgrano.png/190px-Escudo_Oficial_del_Club_Atl%C3%A9tico_Belgrano.png" },
        { id: 4, opponent: "Tigre", score: "1-0", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Escudo_del_Club_Atl%C3%A9tico_Tigre_-_2019.svg/125px-Escudo_del_Club_Atl%C3%A9tico_Tigre_-_2019.svg.png" },
        { id: 5, opponent: "Platense", score: "1-1", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Escudo_del_Club_Alt%C3%A9tico_Platense.svg/127px-Escudo_del_Club_Alt%C3%A9tico_Platense.svg.png" },
    ];

    const playerStats = [
        { id: 1, name: "Romero", rating: 7.3, goals: 12, assists: 4 },
        { id: 2, name: "Aquino", rating: 7.7, goals: 7, assists: 4 },
        { id: 3, name: "Pizzini", rating: 7.4, goals: 4, assists: 5 },
    ];

    return (
        <Container>
            
            <View className="flex flex-row justify-between items-center p-4">
                <BackButton />
                <FollowButton
                    onPress={followTeam}
                    following={following}
                />
            </View>

            
            <View className="flex flex-row items-center p-4">
                <Image
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg/140px-Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg.png" }}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                />
                <View className="ml-4">
                    <Text className="text-2xl font-bold">Vélez Sarsfield</Text>
                    <Text className="text-gray-500">Argentina</Text>
                </View>
            </View>

            
            <View className="p-4">
                <Text className="text-lg font-bold">Partido siguiente</Text>
                <Text className="text-gray-500 mt-2">
                    Vélez Sarsfield vs Lanús - Mañana 19:15
                </Text>
            </View>

            
            <View className="p-4">
                <Text className="text-lg font-bold">Últimos partidos</Text>
                <FlatList
                    data={recentMatches}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    renderItem={({ item }) => (
                        <View className="flex items-center mx-2">
                            <Image
                                source={{ uri: item.logo }}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain"
                            />
                            <Text>{item.score}</Text>
                            <Text className="text-gray-500">{item.opponent}</Text>
                        </View>
                    )}
                />
            </View>

            
            <View className="p-4">
                <Text className="text-lg font-bold">Estadísticas de temporada</Text>
                {playerStats.map((player) => (
                    <View
                        key={player.id}
                        className="flex flex-row justify-between items-center mt-4"
                    >
                        <Text className="font-bold">{player.name}</Text>
                        <Text>Rating: {player.rating}</Text>
                        <Text>Goles: {player.goals}</Text>
                        <Text>Asistencias: {player.assists}</Text>
                    </View>
                ))}
            </View>
        </Container>
    );
};

export default TeamDetails;
