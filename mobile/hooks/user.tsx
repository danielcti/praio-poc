import React, { createContext, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import api from "../services/api";
import { FormikProps, useFormik } from "formik";
import {
  Authentication,
  CreateUserForm,
  LoginUserForm,
  User,
  UserLocation,
} from "../types/User";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { AxiosError } from "axios";
import * as Location from "expo-location";
import {
  API_URL,
  UPDATE_USER_COORD_QUERY,
  USER_LIST_QUERY,
} from "../constants/constants";
import io from "socket.io-client";
import { Alert } from "react-native";
import { Order } from "../types/Order";
import { shouldUpdateCoords } from "../utils/userHelper";

interface UserContextData {
  userSession: Authentication | undefined;
  setUserSession: (userSession: Authentication | undefined) => void;
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
  userListQuery: UseQueryResult<User[], AxiosError>;
  location: UserLocation;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const UserProvider = ({ children }: any) => {
  const [userSession, setUserSession] = useState<Authentication | undefined>(
    undefined
  );
  const [location, setLocation] = React.useState<UserLocation>(
    {} as UserLocation
  );

  const createUserValidationSchema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
    is_client: yup.boolean(),
    is_merchant: yup.boolean(),
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
    onSubmit: async (_, { resetForm }) => {
      await createUserMutation.mutateAsync({
        name,
        email: createUserEmail,
        password: createUserPassword,
        is_client,
        is_merchant,
      });
      resetForm();
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
    email: yup
      .string()
      .email("Digite um email válido")
      .required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
  });

  const loginUserFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserValidationSchema,
    onSubmit: async (_, { resetForm }) => {
      await loginUserMutation.mutateAsync({
        email: loginUserEmail,
        password: loginUserPassword,
      });
      resetForm();
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

  const fetchUserList = async (): Promise<User[]> => {
    const { data } = await api.get("/user");
    return data;
  };

  const userListQuery = useQuery<User[], AxiosError>(
    [USER_LIST_QUERY, userSession],
    fetchUserList,
    {
      enabled: userSession?.auth,
      retry: false,
      staleTime: 10000,
    }
  );

  const updateUserCoord = async (): Promise<User> => {
    const { data } = await api.post("/user/coords", {
      id: userSession?.user.id,
      latitude: location?.latitude,
      longitude: location?.longitude,
    });
    return data;
  };

  const updateUserCoordQuery = useQuery<User, AxiosError>(
    [UPDATE_USER_COORD_QUERY, userSession, location],
    updateUserCoord,
    {
      enabled:
        !!userSession?.auth &&
        shouldUpdateCoords(
          userSession?.user?.latitude,
          userSession?.user?.longitude,
          location?.latitude,
          location?.longitude
        ),
    }
  );

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, [Location]);

  const registerSocket = () => {
    if (userSession?.auth) {
      const socket = io(API_URL, {
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        api.post("user/socket", {
          socketId: socket.id,
          userId: userSession?.user.id,
        });
      });

      socket.on("order", (order: Order) => {
        Alert.alert("Novo pedido!");
      });
    }
  };

  useEffect(() => {
    registerSocket();
  }, [userSession]);

  return (
    <UserContext.Provider
      value={{
        userSession,
        setUserSession,
        createUserFormik,
        createUserMutation,
        loginUserFormik,
        loginUserMutation,
        userListQuery,
        location,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useUser };
