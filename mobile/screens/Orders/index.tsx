import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderComponent from "../../components/OrderComponent";
import { useOrder } from "../../hooks/order";
import { useUser } from "../../hooks/user";

export default function Orders() {
  const { orderListQuery } = useOrder();
  const { userSession } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        {orderListQuery?.data?.map((order, idx) => (
          <OrderComponent
            key={idx}
            order={order}
            isClient={userSession?.user?.is_client}
          />
        ))}
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
