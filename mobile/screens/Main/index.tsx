import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Principal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
