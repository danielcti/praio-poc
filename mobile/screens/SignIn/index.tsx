import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "../../navigation/PublicRoutes/LoginRoutes";

type signInScreenProp = StackNavigationProp<LoginStackParamList, "SignIn">;

export default function SignIn() {
  const navigation = useNavigation<signInScreenProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text>Click</Text>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
