import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../../screens/Main";
import MerchantProfile from "../../screens/MerchantProfile";
import FoodPage from "../../screens/FoodPage";

export type MainStackParamList = {
  MapView: undefined;
  MerchantProfile: {
    merchant_id: number;
    merchant_name: string;
    merchant_lat: number;
    merchant_lng: number;
  };
  FoodPage: {
    food_id: number;
  };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MapView"
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
