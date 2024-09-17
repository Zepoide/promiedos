import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { SafeAreaView } from 'react-native'

const Profile = () => {
    return (
        <SafeAreaView
        style={styles.all_background}
        >  
            <View
            style={styles.all_background}
            >
                <ThemedText
                style={styles.title}
                >
                    PROFILE
                </ThemedText>
            </View>
        </SafeAreaView>
)
}

export default Profile

const styles = StyleSheet.create({
    all_background: {
        backgroundColor: "#333",
        height: "100%",
        width: "100%"
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20
    }
})