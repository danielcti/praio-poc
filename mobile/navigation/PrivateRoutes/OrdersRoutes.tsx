import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../../screens/Orders";

const Stack = createStackNavigator();

const OrdersRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pedidos" component={Orders} />
    </Stack.Navigator>
  );
};

export default OrdersRoutes;
