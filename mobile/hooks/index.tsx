import React from "react";
import { UserProvider } from "./user";
import { FoodProvider } from "./food";

export const AppProvider = ({ children }: any) => {
  return (
    <UserProvider>
      <FoodProvider>{children}</FoodProvider>
    </UserProvider>
  );
};
