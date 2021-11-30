import React, { useState, useEffect, useContext } from "react";
import { useApplication } from "../hooks/application";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes/LoginRoutes";

const Routes: React.FC = () => {
  const { userSession } = useApplication();

  return userSession?.auth ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
