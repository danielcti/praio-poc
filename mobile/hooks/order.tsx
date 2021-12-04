import React, { createContext, useContext, useState } from "react";
import * as yup from "yup";
import api from "../services/api";
import { FormikProps, useFormik } from "formik";
import { CreateOrderForm, Order } from "../types/Order";
import { useMutation, UseMutationResult } from "react-query";
import { AxiosError } from "axios";

interface OrderContextData {
  createOrderFormik: FormikProps<CreateOrderForm>;
  createOrderMutation: UseMutationResult<
    Order,
    AxiosError,
    CreateOrderForm,
    unknown
  >;
}

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

const OrderProvider = ({ children }: any) => {
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
  });

  return (
    <OrderContext.Provider
      value={{
        createOrderFormik,
        createOrderMutation,
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
