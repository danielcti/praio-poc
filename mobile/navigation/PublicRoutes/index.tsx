import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginRoutes from "./LoginRoutes";

const Routes = () => {
  return (
    <NavigationContainer>
      <LoginRoutes />
    </NavigationContainer>
  );
};

export default Routes;
