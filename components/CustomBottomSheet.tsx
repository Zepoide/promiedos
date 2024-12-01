import React, { useCallback, useRef } from "react";
import { Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Calendar from "@/components/Calendar";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

interface CustomBottomSheetProps {
  modalRef: React.RefObject<BottomSheetModal>;
  showModal: () => void;
  children: React.ReactNode;
}

const CustomBottomSheet = ({
  modalRef,
  showModal,
  children,
}: CustomBottomSheetProps) => {
  // ref
  const { colorScheme } = useColorScheme();
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleDateChange = (date: Date) => {};

  // renders
  return (
    <GestureHandlerRootView className="flex-1 justify-center bg-gray-500 p-6">
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={modalRef}
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: Colors[colorScheme].background }}
          handleIndicatorStyle={{ backgroundColor: Colors[colorScheme].text }}
        >
          <BottomSheetView className="flex-1 justify-center items-center">
            {/* <ThemedView type="background" className="">
              <Calendar date={new Date()} setDate={handleDateChange} />
            </ThemedView> */}
            {children}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default CustomBottomSheet;
