import { useRoute } from "@react-navigation/core";
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFood } from "../../hooks/food";
import FoodComponent from "../../components/FoodComponent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useOrder } from "../../hooks/order";
import { useUser } from "../../hooks/user";

interface Params {
  food_id: number;
}

export default function FoodPage() {
  const { userSession } = useUser();
  const { createOrderFormik, createOrderMutation } = useOrder();
  const route = useRoute();
  const { foodListQuery } = useFood();
  const routeParams = route.params as Params;
  const myFood = foodListQuery?.data?.find(
    (food) => food.id === routeParams?.food_id
  );

  const handleSubmit = async () => {
    if (!createOrderFormik.isValid) {
      return ToastAndroid.show("Algum campo inválido.", ToastAndroid.LONG);
    }
    try {
      createOrderFormik.setValues({
        client_id: userSession?.user.id || 0,
        food_id: myFood?.id || 0,
        merchant_id: myFood?.merchant_id || 0,
        payment_method: 1,
        quantity: createOrderFormik.values.quantity,
      });
      await createOrderFormik.submitForm();
      ToastAndroid.show("Pedido criado com sucesso!", ToastAndroid.LONG);
    } catch (err) {
      ToastAndroid.show("Houve algum erro.", ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FoodComponent food={myFood} />
      <Text style={styles.inputLabel}>Quantidade</Text>
      <TextInput
        style={styles.inputField}
        value={String(createOrderFormik.values.quantity)}
        onChangeText={createOrderFormik.handleChange("quantity")}
        autoCorrect={false}
        keyboardType="numeric"
      />
      <Text style={styles.errorText}>{createOrderFormik.errors.quantity}</Text>
      <TouchableOpacity onPress={handleSubmit} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Fazer pedido</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  orderButton: {
    borderRadius: 20,
    backgroundColor: "#2550A3",
    padding: 15,
    marginTop: 30,
  },
  orderButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  inputLabel: {
    color: "#999",
    fontSize: 14,
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#F2F7FF",
    borderRadius: 8,
    padding: 15,
  },
  errorText: {
    color: "red",
  },
});
