import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../../screens/Orders";
import OrderPage from "../../screens/OrderPage";

export type OrderStackParamList = {
  OrdersPage: undefined;
  OrderPage: {
    order_id: number;
  };
};

const Stack = createStackNavigator<OrderStackParamList>();

const OrdersRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: "Histórico de pedidos",
          headerTitleAlign: "center",
        }}
        name="OrdersPage"
        component={Orders}
      />
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="OrderPage"
        component={OrderPage}
      />
    </Stack.Navigator>
  );
};

export default OrdersRoutes;
