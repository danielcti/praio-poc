import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FoodComponent from "../../../components/FoodComponent";
import { useFood } from "../../../hooks/food";
import { useUser } from "../../../hooks/user";

export default function ProductsSection() {
  const navigation = useNavigation();
  const { userSession } = useUser();
  const { foodListQuery } = useFood();
  const myFoods = foodListQuery?.data?.filter(
    (food) => food.merchant_id === userSession?.user?.id
  );

  return (
    <View>
      <View style={styles.productsHeader}>
        <Text style={styles.title}>Seus produtos</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddFoodPage")}>
          <Text>Adicionar novo produto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsList}>
        {myFoods?.map((food, idx) => (
          <FoodComponent key={idx} food={food} nextUrl="EditFoodPage" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  title: {
    fontWeight: "bold",
  },
  productsList: {
    marginTop: 30,
  },
});
