import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Map from "../../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../../types/User";
import { useUser } from "../../hooks/user";
import { useFood } from "../../hooks/food";
import { filterUsers } from "../../utils/userHelper";

export default function Main() {
  const [inputText, setInputText] = React.useState("");
  const { userSession, userListQuery } = useUser();
  const { foodListQuery } = useFood();
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    if (userListQuery?.data) {
      setFilteredUsers(userListQuery.data);
    }
  }, [userListQuery]);

  React.useEffect(() => {
    if (userListQuery?.data && foodListQuery?.data) {
      const filtered = filterUsers(
        userListQuery?.data,
        foodListQuery?.data,
        inputText
      );
      setFilteredUsers(filtered);
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
      <Map users={filteredUsers} />
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
