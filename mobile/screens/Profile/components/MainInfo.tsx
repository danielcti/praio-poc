import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useUser } from "../../../hooks/user";

export default function MainInfo() {
  const { userSession, setUserSession } = useUser();

  const handleLogOut = () => {
    setUserSession(undefined);
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://via.placeholder.com/100" }}
        />
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{userSession?.user?.name}</Text>
          <TouchableOpacity onPress={handleLogOut}>
            <Text style={styles.logout}>
              Sair <Ionicons name="log-out-outline" size={12} color="#FF4136" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.infoTitle}>
        <Ionicons name="information-circle-outline" size={14} color="#000" />{" "}
        Dados Pessoais
      </Text>
      <View style={styles.userInfoContainer}>
        <Text style={styles.info}>
          <Ionicons name="mail-outline" size={12} color="#000" /> E-mail
        </Text>
        <Text style={styles.innerInfo}>{userSession?.user?.email}</Text>
        <Text style={styles.info}>
          <Ionicons name="call-outline" size={12} color="#000" /> Telefone
        </Text>
        <Text style={styles.innerInfo}>
          {userSession?.user?.phone || "(81) 9 9999-9999"}
        </Text>
      </View>
      <View style={styles.lastAccessContainer}>
        <Text style={styles.lastAccess}>
          Último acesso em{" "}
          {userSession?.user?.last_time_active || "05/12/2021 às 11:47"}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userNameContainer: {
    marginLeft: 20,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userInfoContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logout: {
    color: "#FF4136",
    fontSize: 14,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 10,
  },
  info: {
    fontSize: 14,
    fontWeight: "bold",
    margin: 5,
  },
  innerInfo: {
    fontSize: 16,
    margin: 5,
    marginLeft: 10,
    marginBottom: 10,
  },
  lastAccessContainer: {
    alignItems: "center",
  },
  lastAccess: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 20,
  },
});
