import * as React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserOrder } from "../types/Order";
import { getFormattedStatusName, getStatusColor } from "../utils/format";

interface OrderProps {
  order: UserOrder | undefined;
  isClient?: boolean;
}

export default function OrderComponent({ order, isClient }: OrderProps) {
  if (!order) return <></>;

  return (
    <TouchableOpacity style={styles.orderContainer} onPress={() => {}}>
      <View
        style={[
          styles.orderStatus,
          { backgroundColor: getStatusColor(order.status) },
        ]}
      >
        <Text style={styles.orderStatusText}>
          {getFormattedStatusName(order.status)}
        </Text>
      </View>
      <View style={styles.orderWrapper}>
        <Image
          style={styles.orderImage}
          source={{ uri: "https://via.placeholder.com/90" }}
        />
        <View style={styles.orderInfoContainer}>
          <Text style={styles.foodName}>{order.food_name}</Text>
          {isClient ? (
            <Text style={styles.userName}>{order.merchant_name}</Text>
          ) : (
            <Text style={styles.userName}>{order.client_name}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    marginTop: 20,
  },
  orderWrapper: {
    flexDirection: "row",
    backgroundColor: "#F2F7FF",
    padding: 10,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  orderImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  orderInfoContainer: {
    marginLeft: 20,
    justifyContent: "space-between",
  },
  userName: {
    fontSize: 18,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderPrice: {},
  orderStatus: {
    padding: 10,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  orderStatusText: {
    color: "#fff",
  },
});
