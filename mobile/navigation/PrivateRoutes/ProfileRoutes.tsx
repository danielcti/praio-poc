import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../../screens/Profile";

const Stack = createStackNavigator();

const ProfileRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
