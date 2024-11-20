import Container from "@/components/Container";
import FollowingCard from "@/components/FollowingCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthorizedUser } from "@/hooks/useUser";
import { Competition, Team } from "@/types/types";
import { FlatList } from "react-native";

const Following = () => {
    const { user } = useAuthorizedUser();

    // TODO: agregar los tipos para la competicion y el team
    // const followedItems = [
    //     ...user.followedCompetitions.map((comp: any) => ({
    //         id: comp.id,
    //         name: comp.name,
    //         logoUrl: comp.logo,
    //         type: "competition",
    //     })),
    //     ...user.followedTeams.map((team: any) => ({
    //         id: team.id,
    //         name: team.name,
    //         logoUrl: team.logo,
    //         type: "team",
    //     })),
    // ];

    const followedItems = [
        {
            id: 1,
            name: "Velez",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg/140px-Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg.png",
            type: "team",
            color: "red",
        },
        {
            id: 2,
            name: "Huracan",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg/140px-Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg.png",
            type: "team",
            color: "green",
        },
        {
            id: 3,
            name: "Racing",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg/140px-Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg.png",
            type: "team",
            color: "green",
        },
        {
            id: 4,
            name: "River",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg/140px-Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg.png",
            type: "team",
            color: "red",
        },
        {
            id: 5,
            name: "Boca",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg/140px-Escudo_del_Club_Atl%C3%A9tico_V%C3%A9lez_Sarsfield.svg.png",
            type: "team",
            color: "gray",
        },
    ];

    return (
        <Container>
            <ThemedView
                type="primary"
                className="flex-row justify-between items-center "
            >
                <ThemedText className="text-2xl font-extrabold p-3">
                    FOLLOWING
                </ThemedText>
            </ThemedView>

            <ThemedView className="flex-row flex-wrap items-center justify-center gap-3 m-4">
                <FlatList
                    data={followedItems}
                    renderItem={({ item }) => (
                        <FollowingCard
                            name={item.name}
                            url={item.logoUrl ?? ""}
                            color={item.color}
                        />
                    )}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />
            </ThemedView>
        </Container>
    );
};

export default Following;
