import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface ApplicationContextData {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
}

const ApplicationContext = createContext<ApplicationContextData>(
  {} as ApplicationContextData
);

const ApplicationProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <ApplicationContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </ApplicationContext.Provider>
  );
};

function useApplication() {
  const context = useContext(ApplicationContext);
  return context;
}

export { ApplicationProvider, useApplication };
