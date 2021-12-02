import React, { useState, useEffect, useContext } from "react";
import { useUser } from "../hooks/user";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes/LoginRoutes";

const Routes: React.FC = () => {
  const { userSession } = useUser();

  return userSession?.auth ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
