import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../../screens/Orders";

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  );
};

export default OrdersRoutes;
