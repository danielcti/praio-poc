import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginStackParamList } from "../../navigation/PublicRoutes/LoginRoutes";
import { useApplication } from "../../hooks/application";

type signInScreenProp = StackNavigationProp<LoginStackParamList, "SignIn">;

export default function SignIn() {
  const { loginUserFormik, loginUserMutation, setUserSession } =
    useApplication();
  const navigation = useNavigation<signInScreenProp>();

  const handleLogin = async () => {
    try {
      await loginUserFormik.submitForm();
    } catch (err) {
      Alert.alert("Houve algum erro.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Image
          style={{ height: 300 }}
          source={require("../../assets/images/signin_bg.png")}
        />
        <View style={styles.loginSection}>
          <Text style={styles.loginTitle}>ENTRAR</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>

              <TextInput
                style={styles.inputField}
                value={loginUserFormik.values.email}
                onChangeText={loginUserFormik.handleChange("email")}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput
                style={styles.inputField}
                value={loginUserFormik.values.password}
                onChangeText={loginUserFormik.handleChange("password")}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Acessar</Text>
            </TouchableOpacity>
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>Não tem uma conta?</Text>
              <Link style={styles.createAccountLink} to="/SignUp">
                Cadastre-se
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loginSection: {
    padding: 15,
    flex: 1,
  },
  loginTitle: {
    fontWeight: "bold",
    fontSize: 18,
    borderLeftColor: "#999",
    borderLeftWidth: 4,
    paddingLeft: 10,
    color: "#999",
  },
  form: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    color: "#999",
    fontSize: 14,
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#F2F7FF",
    borderRadius: 8,
    padding: 15,
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: "#2550A3",
    padding: 15,
    marginTop: 30,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  createAccountContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  createAccountText: {
    color: "#999",
  },
  createAccountLink: {
    color: "#999",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});
