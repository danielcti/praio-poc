import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../hooks/user";

export default function Profile() {
  const { userSession, setUserSession } = useUser();

  const handleLogOut = () => {
    setUserSession(undefined);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userSession?.user?.name}</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Deslogar</Text>
      </TouchableOpacity>
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
