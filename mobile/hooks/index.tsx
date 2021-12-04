import React from "react";
import { FoodProvider } from "./food";
import { OrderProvider } from "./order";
import { UserProvider } from "./user";

export const AppProvider = ({ children }: any) => {
  return (
    <UserProvider>
      <FoodProvider>
        <OrderProvider>{children}</OrderProvider>
      </FoodProvider>
    </UserProvider>
  );
};
