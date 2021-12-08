import React, { createContext, useContext, useState } from "react";
import * as yup from "yup";
import api from "../services/api";
import { FormikProps, useFormik } from "formik";
import { CreateOrderForm, Order, UserOrder } from "../types/Order";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { AxiosError } from "axios";
import { ORDER_LIST_QUERY } from "../constants/constants";
import { useUser } from "./user";

interface UpdateOrderStatusForm {
  id: number;
  status: string;
  listener_id: number;
}

interface OrderContextData {
  createOrderFormik: FormikProps<CreateOrderForm>;
  createOrderMutation: UseMutationResult<
    Order,
    AxiosError,
    CreateOrderForm,
    unknown
  >;
  orderListQuery: UseQueryResult<UserOrder[], AxiosError>;
  updateOrderFormik: FormikProps<UpdateOrderStatusForm>;
  updateOrderStatusMutation: UseMutationResult<
    Order,
    AxiosError,
    UpdateOrderStatusForm,
    unknown
  >;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider = ({ children }: any) => {
  const { userSession } = useUser();
  const clientQuery = useQueryClient();

  const createOrderValidationSchema = yup.object({
    client_id: yup.number().required(),
    merchant_id: yup.number().required(),
    food_id: yup.number().required(),
    payment_method: yup.number().required(),
    quantity: yup
      .number()
      .integer("Quantidade precisa ser um número inteiro")
      .typeError("Quantidade precisa ser um número")
      .required("Escolha a quantidade")
      .min(1, "Quantidade não pode ser menor que 1")
      .max(10, "Quantidade não pode ser maior que 10"),
  });

  const createOrderFormik = useFormik({
    initialValues: {
      client_id: 0,
      merchant_id: 0,
      food_id: 0,
      payment_method: 0,
      quantity: 1,
    },
    validationSchema: createOrderValidationSchema,
    onSubmit: async () => {
      await createOrderMutation.mutateAsync({
        client_id,
        food_id,
        merchant_id,
        payment_method,
        quantity,
      });
    },
  });

  const { client_id, food_id, merchant_id, payment_method, quantity } =
    createOrderFormik.values;

  const fetchCreateOrder = async (body: CreateOrderForm) => {
    const { data } = await api.post<Order>("/order/create", body);
    return data;
  };

  const createOrderMutation = useMutation<
    Order,
    AxiosError,
    CreateOrderForm,
    unknown
  >(fetchCreateOrder, {
    retry: false,
    onSuccess: () => clientQuery.invalidateQueries(ORDER_LIST_QUERY),
  });

  const fetchOrderList = async (): Promise<UserOrder[]> => {
    const { data } = await api.post("/order/list", {
      client_id: userSession?.user?.is_client
        ? userSession?.user.id
        : undefined,
      merchant_id: userSession?.user?.is_merchant
        ? userSession?.user.id
        : undefined,
    });
    return data;
  };

  const orderListQuery = useQuery<UserOrder[], AxiosError>(
    [ORDER_LIST_QUERY, userSession?.auth],
    fetchOrderList,
    {
      enabled: !!userSession?.token,
      retry: false,
      staleTime: 10000,
    }
  );

  const updateOrderValidationSchema = yup.object({
    id: yup.number().required(),
    status: yup.string().required(),
  });

  const updateOrderFormik = useFormik({
    initialValues: {
      id: 0,
      status: "",
      listener_id: 0,
    },
    validationSchema: updateOrderValidationSchema,
    onSubmit: async () => {
      await updateOrderStatusMutation.mutateAsync({
        id,
        status,
        listener_id,
      });
    },
  });

  const { id, status, listener_id } = updateOrderFormik.values;

  const fetchUpdateOrderStatus = async ({
    id,
    status,
    listener_id,
  }: UpdateOrderStatusForm) => {
    const { data } = await api.put<Order>(
      `/order/${status}?id=${id}&listener_id=${listener_id}`
    );
    return data;
  };

  const updateOrderStatusMutation = useMutation<
    Order,
    AxiosError,
    UpdateOrderStatusForm,
    unknown
  >(fetchUpdateOrderStatus, {
    retry: false,
    onSuccess: () => clientQuery.invalidateQueries(ORDER_LIST_QUERY),
  });

  return (
    <OrderContext.Provider
      value={{
        createOrderFormik,
        createOrderMutation,
        orderListQuery,
        updateOrderFormik,
        updateOrderStatusMutation,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

function useOrder() {
  const context = useContext(OrderContext);
  return context;
}

export { OrderProvider, useOrder };
