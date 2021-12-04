import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MainStackParamList } from "../navigation/PrivateRoutes/MainRoutes";
import { Food } from "../types/Food";
import { formatMoney } from "../utils/format";

interface FoodProps {
  food: Food | undefined;
}

type foodComponentProp = StackNavigationProp<MainStackParamList, "FoodPage">;

export default function FoodComponent({ food }: FoodProps) {
  const navigation = useNavigation<foodComponentProp>();
  if (!food) return <></>;

  return (
    <TouchableOpacity
      style={styles.foodContainer}
      onPress={() =>
        navigation.navigate("FoodPage", {
          food_id: food.id,
        })
      }
    >
      <Image
        style={styles.foodImage}
        source={{ uri: "https://via.placeholder.com/90" }}
      />
      <View style={styles.foodInfoContainer}>
        <Text style={styles.foodName}>{food.name}</Text>
        <Text style={styles.foodPrice}>{formatMoney(food.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  foodContainer: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#F2F7FF",
    padding: 10,
    borderRadius: 10,
  },
  foodImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  foodInfoContainer: {
    marginLeft: 20,
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: 18,
  },
  foodPrice: {},
});
