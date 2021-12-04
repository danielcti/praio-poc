import React, { createContext, useContext } from "react";
import api from "../services/api";
import { useQuery, UseQueryResult } from "react-query";
import { AxiosError } from "axios";
import { Food } from "../types/Food";
import { useUser } from "./user";
import { FOOD_LIST_QUERY } from "../constants/constants";

interface FoodContextData {
  foodListQuery: UseQueryResult<Food[], AxiosError>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

const FoodProvider = ({ children }: any) => {
  const { userSession } = useUser();
  const fetchFoodList = async (): Promise<Food[]> => {
    const { data } = await api.get("/food", {
      headers: {
        authorization: `Bearer ${userSession?.token}`,
      },
    });
    return data;
  };

  const foodListQuery = useQuery<Food[], AxiosError>(
    [FOOD_LIST_QUERY, userSession?.auth],
    fetchFoodList,
    {
      enabled: !!userSession?.token,
      retry: false,
      staleTime: 10000,
    }
  );
  return (
    <FoodContext.Provider value={{ foodListQuery }}>
      {children}
    </FoodContext.Provider>
  );
};

function useFood() {
  const context = useContext(FoodContext);
  return context;
}

export { FoodProvider, useFood };
