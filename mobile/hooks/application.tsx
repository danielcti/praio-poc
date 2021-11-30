import React, { createContext, useContext, useState } from "react";
import * as yup from "yup";
import api from "../services/api";
import { FormikProps, useFormik } from "formik";
import {
  Authentication,
  CreateUserForm,
  LoginUserForm,
  User,
} from "../types/User";
import { useMutation, UseMutationResult } from "react-query";
import { AxiosError } from "axios";

interface ApplicationContextData {
  userSession: Authentication | undefined;
  setUserSession: (userSession: Authentication) => void;
  createUserFormik: FormikProps<CreateUserForm>;
  createUserMutation: UseMutationResult<
    User,
    AxiosError,
    CreateUserForm,
    unknown
  >;
  loginUserFormik: FormikProps<LoginUserForm>;
  loginUserMutation: UseMutationResult<
    Authentication,
    AxiosError,
    LoginUserForm,
    unknown
  >;
}

const ApplicationContext = createContext<ApplicationContextData>(
  {} as ApplicationContextData
);

const ApplicationProvider = ({ children }: any) => {
  const [userSession, setUserSession] = useState<Authentication | undefined>(
    undefined
  );

  const createUserValidationSchema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email().required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
    is_client: yup.boolean().notRequired(),
    is_merchant: yup.boolean().notRequired(),
  });

  const createUserFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      is_merchant: false,
      is_client: false,
    },
    validationSchema: createUserValidationSchema,
    onSubmit: async () => {
      await createUserMutation.mutateAsync({
        name,
        email: createUserEmail,
        password: createUserEmail,
        is_client,
        is_merchant,
      });
    },
  });

  const {
    name,
    email: createUserEmail,
    password: createUserPassword,
    is_client,
    is_merchant,
  } = createUserFormik.values;

  const fetchCreateUser = async (body: CreateUserForm) => {
    const { data } = await api.post<User>("/account/register", body);
    return data;
  };

  const createUserMutation = useMutation<
    User,
    AxiosError,
    CreateUserForm,
    unknown
  >(fetchCreateUser, {
    retry: false,
  });

  const loginUserValidationSchema = yup.object({
    email: yup.string().email().required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
  });

  const loginUserFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidationSchema,
    onSubmit: async () => {
      await loginUserMutation.mutateAsync({
        email: loginUserEmail,
        password: loginUserPassword,
      });
    },
  });

  const { email: loginUserEmail, password: loginUserPassword } =
    loginUserFormik.values;

  const fetchLoginUser = async (body: LoginUserForm) => {
    const { data } = await api.post<Authentication>("/account/login", body);
    setUserSession(data);
    return data;
  };

  const loginUserMutation = useMutation<
    Authentication,
    AxiosError,
    LoginUserForm,
    unknown
  >(fetchLoginUser, {
    retry: false,
  });

  return (
    <ApplicationContext.Provider
      value={{
        userSession,
        setUserSession,
        createUserFormik,
        createUserMutation,
        loginUserFormik,
        loginUserMutation,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

function useApplication() {
  const context = useContext(ApplicationContext);
  return context;
}

export { ApplicationProvider, useApplication };
