import Container from "@/components/Container";
import CustomTabView from "@/components/CustomTabView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { userStore } from "@/store/userStore";
import FollowedTeams from "@/pages/FollowedTeams";
import FollowedCompetitions from "@/pages/FollowedCompetitions";
import Icon from "@/components/Icon";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity, Animated, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useState, useRef, useCallback, useMemo } from "react";
import SearchPage from "@/components/SearchPage";
import Calendar from "@/components/Calendar";
import { SafeAreaView } from "react-native-safe-area-context";

const Following = () => {
  const { user } = userStore();
  const { colorScheme } = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const handleClosePress = useCallback(() => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
    sheetRef.current?.close();
  }, []);

  const handleOpenSheet = useCallback(() => {
    setModalVisible(true);
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    sheetRef.current?.snapToIndex(0);
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        handleClosePress();
      }
    },
    [handleClosePress]
  );

  return (
    <Container>
      <ThemedView
        type="primary"
        className="flex-row justify-between items-center "
      >
        <ThemedText className="text-2xl font-extrabold p-3">
          Following
        </ThemedText>
        <ThemedView className="flex flex-row items-center p-3">
          <TouchableOpacity onPress={handleOpenSheet} activeOpacity={0.8}>
            <Icon name="search-outline" size={24} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <CustomTabView
        tabs={["Teams", "Competition"]}
        pages={[
          () => <FollowedTeams teamsIds={user!.followedTeams} />,
          () => (
            <FollowedCompetitions
              competitionsIds={user!.followedCompetitions}
            />
          ),
        ]}
      />
      {modalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: animatedOpacity,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={handleClosePress}
          />
        </Animated.View>
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        index={-1} // Initially closed
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].secondary,
        }}
        handleIndicatorStyle={{ backgroundColor: Colors[colorScheme].text }}
        onChange={handleSheetChanges}
        enablePanDownToClose
      >
        <SearchPage />
      </BottomSheet>
    </Container>
  );
};

export default Following;
