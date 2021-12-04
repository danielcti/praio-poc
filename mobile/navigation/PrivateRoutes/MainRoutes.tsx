import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../../screens/Main";
import MerchantProfile from "../../screens/MerchantProfile";
import FoodPage from "../../screens/FoodPage";

const Stack = createStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Principal Página"
        component={Main}
      />
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="MerchantProfile"
        component={MerchantProfile}
      />
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="FoodPage"
        component={FoodPage}
      />
    </Stack.Navigator>
  );
};

export default MainRoutes;
