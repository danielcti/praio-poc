import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Link } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import { LoginStackParamList } from "../../navigation/PublicRoutes/LoginRoutes";
import { useUser } from "../../hooks/user";

type signUpScreenProp = StackNavigationProp<LoginStackParamList, "SignUp">;

export default function SignUp() {
  const navigation = useNavigation<signUpScreenProp>();
  const { createUserFormik } = useUser();

  const handleUserTypeChange = (userType: string) => {
    if (userType === "client") {
      createUserFormik.setFieldValue("is_client", true);
      createUserFormik.setFieldValue("is_merchant", false);
      return;
    }

    createUserFormik.setFieldValue("is_client", false);
    createUserFormik.setFieldValue("is_merchant", true);
  };

  const handleSubmit = async () => {
    if (!createUserFormik.isValid) {
      return ToastAndroid.show("Algum campo inválido.", ToastAndroid.LONG);
    }
    try {
      await createUserFormik.submitForm();
      ToastAndroid.show("Conta criada com sucesso!", ToastAndroid.LONG);
      navigation.navigate("SignIn");
    } catch (err) {
      ToastAndroid.show("Houve algum erro.", ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Image
          style={{ height: 300 }}
          source={require("../../assets/images/signup_bg.png")}
        />
        <View style={styles.loginSection}>
          <Text style={styles.loginTitle}>CRIAR CONTA</Text>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome</Text>
              <TextInput
                style={styles.inputField}
                value={createUserFormik.values.name}
                onChangeText={createUserFormik.handleChange("name")}
                autoCorrect={false}
              />
              <Text style={styles.errorText}>
                {createUserFormik.errors.name}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.inputField}
                value={createUserFormik.values.email}
                onChangeText={createUserFormik.handleChange("email")}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <Text style={styles.errorText}>
                {createUserFormik.errors.email}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput
                style={styles.inputField}
                value={createUserFormik.values.password}
                onChangeText={createUserFormik.handleChange("password")}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
              <Text style={styles.errorText}>
                {createUserFormik.errors.password}
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Escolha seu tipo de perfil</Text>
              <View style={styles.userTypeButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    styles.userTypeButtonFirstChild,
                    createUserFormik.values.is_client &&
                      styles.userTypeButtonActive,
                  ]}
                  onPress={() => handleUserTypeChange("client")}
                >
                  <Text style={styles.userTypeButtonText}>Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    createUserFormik.values.is_merchant &&
                      styles.userTypeButtonActive,
                  ]}
                  onPress={() => handleUserTypeChange("merchant")}
                >
                  <Text style={styles.userTypeButtonText}>Comerciante</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleSubmit()}
              disabled={!createUserFormik.dirty}
            >
              <Text style={styles.loginButtonText}>Criar conta</Text>
            </TouchableOpacity>
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>Já tem uma conta?</Text>
              <Link style={styles.createAccountLink} to="/SignIn">
                Entrar
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
  userTypeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userTypeButton: {
    borderRadius: 20,
    borderColor: "#2550A3",
    borderWidth: 2,
    padding: 15,
    flex: 1,
  },
  userTypeButtonActive: {
    backgroundColor: "#F2F7FF",
  },
  userTypeButtonFirstChild: {
    marginRight: 20,
  },
  userTypeButtonText: {
    color: "#2550A3",
    textAlign: "center",
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
  errorText: {
    color: "red",
  },
});
