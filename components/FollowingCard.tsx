import { Image, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useAuthorizedUser } from "@/hooks/useUser";

interface FollowingProps {
    url: string;
    name: string;
    color: string;
}

const FollowingCard = ({ url, name, color }: FollowingProps) => {
    const { user } = useAuthorizedUser();

    // console.log(user.followedCompetitions);
    // console.log(user.followedTeams);

    // redirect to team screen
    const handleFollowingPress = () => {
        return;
    };
    return (
        <TouchableOpacity
            className={`w-[150px] h-[150px] bg-${color}-500 rounded-lg flex items-start justify-center p-5 m-2`}
            onPress={() => handleFollowingPress()}
        >
            <Image
                resizeMode="contain"
                source={{ uri: url }}
                className="w-[50px] h-[50px]"
            />
            <ThemedText className="font-bold text-black text-xl p-1 mt-5">
                {name}
            </ThemedText>
        </TouchableOpacity>
    );
};

export default FollowingCard;
