import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LoginStackParamList } from "../../navigation/PublicRoutes/LoginRoutes";

type signUpScreenProp = StackNavigationProp<LoginStackParamList, "SignUp">;

export default function SignUp() {
  const navigation = useNavigation<signUpScreenProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <View style={styles.separator} />
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
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
