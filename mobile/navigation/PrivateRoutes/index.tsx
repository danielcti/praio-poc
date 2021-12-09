import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MainRoutes from "./MainRoutes";
import OrdersRoutes from "./OrdersRoutes";
import ProfileRoutes from "./ProfileRoutes";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Perfil"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Principal") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Pedidos") {
              iconName = focused ? "list-circle" : "list-circle-outline";
            } else if (route.name === "Perfil") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2550A3",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            flexDirection: "column",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Principal" component={MainRoutes} />
        <Tab.Screen name="Pedidos" component={OrdersRoutes} />
        <Tab.Screen name="Perfil" component={ProfileRoutes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
