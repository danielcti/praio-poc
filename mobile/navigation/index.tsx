import React, { useState, useEffect, useContext } from "react";
import { useApplication } from "../hooks/application";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes/LoginRoutes";

const Routes: React.FC = () => {
  const { isLogged } = useApplication();

  return isLogged ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
