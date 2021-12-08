import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { OrderStackParamList } from "../navigation/PrivateRoutes/OrdersRoutes";
import { OrderStatus, UserOrder } from "../types/Order";
import { getFormattedStatusName, getStatusColor } from "../utils/format";

interface OrderProps {
  order: UserOrder | undefined;
  isClient?: boolean;
}

type orderComponentProp = StackNavigationProp<OrderStackParamList, "OrderPage">;

export default function OrderComponent({ order, isClient }: OrderProps) {
  const navigation = useNavigation<orderComponentProp>();

  if (!order) return <></>;

  return (
    <TouchableOpacity
      style={styles.orderContainer}
      onPress={() =>
        navigation.navigate("OrderPage", {
          order_id: order.id,
        })
      }
    >
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
          {(order?.status === OrderStatus.open ||
            order?.status === OrderStatus.ongoing) && (
            <Text>Solicitado em: {order.time_ordered}</Text>
          )}
          {order?.status === OrderStatus.finished && (
            <Text>Finalizado em: {order.time_delivered}</Text>
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
