import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'

const Index = () => {
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
          PROMIEDOS
        </ThemedText>
      </View>
    </SafeAreaView>
  )
}

export default Index

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
