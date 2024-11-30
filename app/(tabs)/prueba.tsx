import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

const App = () => {
  const data1 = Array.from({ length: 20 }, (_, i) => `First List Item ${i}`);
  const data2 = Array.from({ length: 20 }, (_, i) => `Second List Item ${i}`);

  return (
    <View style={styles.container}>
      <FlatList
        data={data1}
        keyExtractor={(item, index) => `list1-${index}`}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        style={styles.flatList}
      />
      <FlatList
        data={data2}
        keyExtractor={(item, index) => `list2-${index}`}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flexGrow: 0, // Prevents FlatList from taking unnecessary space
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default App;
