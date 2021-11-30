import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApplication } from "../../hooks/application";

export default function Profile() {
  const { userSession } = useApplication();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userSession?.user?.name}</Text>
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
