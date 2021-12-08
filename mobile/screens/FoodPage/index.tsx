import { useNavigation, useRoute } from "@react-navigation/core";
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
import { Ionicons } from "@expo/vector-icons";

interface Params {
  food_id: number;
}

export default function FoodPage() {
  const navigation = useNavigation();

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
      navigation.navigate("OrdersPage", { scrollTop: true });
    } catch (err) {
      ToastAndroid.show("Houve algum erro.", ToastAndroid.LONG);
    }
  };

  const updateQuantity = (incrementValue: number) => {
    const quantity = createOrderFormik.values.quantity;
    createOrderFormik.setFieldValue(
      "quantity",
      Number(quantity) + Number(incrementValue)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FoodComponent food={myFood} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Adicionar quantidade</Text>
        <View style={styles.inputFieldContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(-1)}
          >
            <Ionicons name="remove-circle" size={20} color="#2550A3" />
          </TouchableOpacity>
          <TextInput
            style={styles.inputField}
            value={String(createOrderFormik.values.quantity)}
            onChangeText={createOrderFormik.handleChange("quantity")}
            autoCorrect={false}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(1)}
          >
            <Ionicons name="add-circle" size={20} color="#2550A3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.errorText}>
          {createOrderFormik.errors.quantity}
        </Text>
      </View>
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
  inputContainer: {
    marginTop: 30,
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    color: "#1C2239",
    fontSize: 14,
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#F2F7FF",
    borderRadius: 8,
    padding: 10,
    width: 50,
    textAlign: "center",
  },
  errorText: {
    color: "red",
  },
  quantityButton: {
    padding: 10,
  },
});
