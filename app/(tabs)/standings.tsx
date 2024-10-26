import {
    SafeAreaView,
    useColorScheme,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "@/components/ThemedView";
import useStandings from "@/hooks/useStandings";

const Standings = () => {
    const colorScheme = useColorScheme();

    const standings = useStandings();
        
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
            flex: 1,
            backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView
                style={{
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    flex: 1,
                    width: "auto",
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                }}
                >
                    <ThemedView>
                        <ThemedText>Standings</ThemedText>
                        <ThemedText>{standings ? standings[0].competitionId : ""}</ThemedText>
                    </ThemedView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Standings