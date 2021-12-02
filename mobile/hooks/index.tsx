import React from "react";
import { UserProvider } from "./user";

export const AppProvider = ({ children }: any) => {
  return <UserProvider>{children}</UserProvider>;
};
