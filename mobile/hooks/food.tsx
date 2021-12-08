import React, { createContext, useContext } from "react";
import * as yup from "yup";
import api from "../services/api";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { AxiosError } from "axios";
import { CreateFoodForm, Food, UpdateFoodForm } from "../types/Food";
import { useUser } from "./user";
import { FOOD_LIST_QUERY } from "../constants/constants";
import { FormikProps, useFormik } from "formik";

interface FoodContextData {
  foodListQuery: UseQueryResult<Food[], AxiosError>;
  createFoodFormik: FormikProps<CreateFoodForm>;
  createFoodMutation: UseMutationResult<
    Food,
    AxiosError,
    CreateFoodForm,
    unknown
  >;
  updateFoodFormik: FormikProps<UpdateFoodForm>;
  updateFoodMutation: UseMutationResult<
    Food,
    AxiosError,
    UpdateFoodForm,
    unknown
  >;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

const FoodProvider = ({ children }: any) => {
  const clientQuery = useQueryClient();
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

  const createFoodValidationSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    category: yup.string().required(),
  });

  const createFoodFormik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
    },
    validationSchema: createFoodValidationSchema,
    onSubmit: async (_, { resetForm }) => {
      await createFoodMutation.mutateAsync({
        category: createCategory,
        description: createDescription,
        name: createName,
        price: createPrice,
      });
      resetForm();
    },
  });

  const {
    category: createCategory,
    description: createDescription,
    name: createName,
    price: createPrice,
  } = createFoodFormik.values;

  const fetchCreateFood = async (body: CreateFoodForm) => {
    const { data } = await api.post<Food>("/add-food", body, {
      headers: {
        authorization: `Bearer ${userSession?.token}`,
      },
    });
    return data;
  };

  const createFoodMutation = useMutation<
    Food,
    AxiosError,
    CreateFoodForm,
    unknown
  >(fetchCreateFood, {
    retry: false,
    onSuccess: () => clientQuery.invalidateQueries(FOOD_LIST_QUERY),
  });

  const updateFoodValidationSchema = yup.object({
    name: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    category: yup.string().required(),
    id: yup.number().required(),
    merchant_id: yup.number().required(),
  });

  const updateFoodFormik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      id: 0,
      merchant_id: 0,
    },
    validationSchema: updateFoodValidationSchema,
    onSubmit: async () => {
      await updateFoodMutation.mutateAsync({
        category: updateCategory,
        description: updateDescription,
        name: updateName,
        price: updatePrice,
        id,
        merchant_id,
      });
    },
  });

  const {
    category: updateCategory,
    description: updateDescription,
    name: updateName,
    price: updatePrice,
    id,
    merchant_id,
  } = updateFoodFormik.values;

  const fetchUpdateFood = async (body: UpdateFoodForm) => {
    const { data } = await api.put<Food>("/food", body, {
      headers: {
        authorization: `Bearer ${userSession?.token}`,
      },
    });
    return data;
  };

  const updateFoodMutation = useMutation<
    Food,
    AxiosError,
    UpdateFoodForm,
    unknown
  >(fetchUpdateFood, {
    retry: false,
    onSuccess: () => clientQuery.invalidateQueries(FOOD_LIST_QUERY),
  });

  return (
    <FoodContext.Provider
      value={{
        foodListQuery,
        createFoodFormik,
        createFoodMutation,
        updateFoodFormik,
        updateFoodMutation,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

function useFood() {
  const context = useContext(FoodContext);
  return context;
}

export { FoodProvider, useFood };
