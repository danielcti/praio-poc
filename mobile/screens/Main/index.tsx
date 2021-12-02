import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Map from "../../components/Map";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../../types/User";
import { useUser } from "../../hooks/user";

export default function Main() {
  const [location, setLocation] = React.useState<any>(undefined);
  const [inputText, setInputText] = React.useState("");
  const { userSession, userListQuery } = useUser();
  const [filteredUsers, setFilteresUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (userListQuery?.data) {
      setFilteresUsers(userListQuery.data);
    }
  }, [userListQuery]);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [Location]);

  React.useEffect(() => {
    if (userListQuery?.data) {
      const filtered = userListQuery?.data.filter((user) =>
        user.name.toLowerCase().includes(inputText.toLowerCase())
      );
      setFilteresUsers(filtered);
    }
  }, [inputText]);

  return (
    <SafeAreaView style={styles.container}>
      {userSession?.user?.is_client && (
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#2550A3"
            />
            <TextInput
              style={styles.inputField}
              placeholder="Buscar por comida ou vendedor"
              value={inputText}
              onChangeText={setInputText}
            />
          </View>
        </View>
      )}
      <Map users={filteredUsers} location={location} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#F2F7FF",
    borderRadius: 8,
  },
  searchIcon: {
    padding: 10,
  },
  inputField: {
    backgroundColor: "#F2F7FF",
    padding: 10,
    flex: 1,
  },
});
