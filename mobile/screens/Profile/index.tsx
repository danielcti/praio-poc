import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../hooks/user";
import MainInfo from "./components/MainInfo";
import ProductsSection from "./components/ProductsSection";

export default function Profile() {
  const { userSession } = useUser();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <MainInfo />
        {userSession?.user?.is_merchant && <ProductsSection />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
