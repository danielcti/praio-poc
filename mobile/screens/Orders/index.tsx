import { useRoute } from "@react-navigation/core";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderComponent from "../../components/OrderComponent";
import { useOrder } from "../../hooks/order";
import { useUser } from "../../hooks/user";

export default function Orders() {
  const { orderListQuery } = useOrder();
  const { userSession } = useUser();
  const { params } = useRoute();
  const ref = React.useRef();

  React.useEffect(() => {
    if (params?.scrollTop) {
      ref.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }, [orderListQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" ref={ref}>
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
