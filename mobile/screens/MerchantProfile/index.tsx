import { useRoute } from "@react-navigation/core";
import * as React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFood } from "../../hooks/food";
import FoodComponent from "../../components/FoodComponent";
import { measure } from "../../utils/userHelper";
import { useUser } from "../../hooks/user";

interface Params {
  merchant_id: number;
  merchant_name: string;
  merchant_lat: number;
  merchant_lng: number;
}

export default function MerchantProfile() {
  const route = useRoute();
  const { foodListQuery } = useFood();
  const { location } = useUser();
  const routeParams = route.params as Params;
  const merchantFoods = foodListQuery?.data?.filter(
    (food) => food?.merchant_id === routeParams?.merchant_id
  );
  const distance = measure(
    routeParams.merchant_lat,
    routeParams.merchant_lng,
    location.latitude,
    location.longitude
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.headerContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://via.placeholder.com/100" }}
          />
          <View style={styles.merchantInfoContainer}>
            <Text style={styles.merchantName}>
              {routeParams?.merchant_name}
            </Text>
            <Text>{distance !== undefined && `${distance}m`}</Text>
          </View>
        </View>
        <View style={styles.paymentsMethods}>
          <Text style={styles.paymentsMethodsTitle}>Pagamento na entrega</Text>
          {/* <Text>Dinheiro, pix, crédito e débito.</Text> */}
        </View>
        <View style={styles.foodsContainer}>
          {merchantFoods?.map((food) => (
            <FoodComponent key={food.id} food={food} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  merchantInfoContainer: {
    marginLeft: 20,
  },
  merchantName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  paymentsMethods: {
    marginTop: 30,
  },
  paymentsMethodsTitle: {
    fontWeight: "bold",
  },
  foodsContainer: {
    marginTop: 20,
  },
});
