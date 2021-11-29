import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "../../screens/Main";

const Stack = createStackNavigator();

const MainRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Principal" component={Main} />
    </Stack.Navigator>
  );
};

export default MainRoutes;
