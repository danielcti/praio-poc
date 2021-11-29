import React, { useState, useEffect, useContext } from "react";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes/LoginRoutes";

const Routes: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
