import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../../screens/Main";

const Stack = createStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Principal Página"
        component={Main}
      />
    </Stack.Navigator>
  );
};

export default MainRoutes;
