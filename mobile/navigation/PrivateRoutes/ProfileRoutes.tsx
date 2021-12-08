import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../../screens/Profile";
import AddFoodPage from "../../screens/AddFoodPage";
import EditFoodPage from "../../screens/EditFoodPage";

const Stack = createStackNavigator();

const ProfileRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="ProfilePage"
        component={Profile}
      />
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="AddFoodPage"
        component={AddFoodPage}
      />
      <Stack.Screen
        options={{ headerTitle: "" }}
        name="EditFoodPage"
        component={EditFoodPage}
      />
    </Stack.Navigator>
  );
};

export default ProfileRoutes;
