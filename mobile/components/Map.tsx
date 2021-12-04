import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import { User } from "../types/User";
import { useUser } from "../hooks/user";
import { useFood } from "../hooks/food";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../navigation/PrivateRoutes/MainRoutes";

interface MapProps {
  users: User[];
}

type mapComponentProp = StackNavigationProp<MainStackParamList, "MapView">;

export default function Map({ users }: MapProps) {
  const { userSession, location } = useUser();
  const { foodListQuery } = useFood();
  const navigation = useNavigation<mapComponentProp>();

  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: location?.latitude || -8.0990952,
        longitude: location?.longitude || -34.8828124,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}
    >
      {location?.latitude && (
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Eu"
          pinColor={"blue"}
        />
      )}
      {users
        ?.filter(
          (user) =>
            !!user.latitude &&
            ((user.is_merchant && userSession?.user.is_client) ||
              (user.is_client && userSession?.user.is_merchant))
        )
        .map((user) => (
          <Marker
            key={user.id}
            style={{ zIndex: 1000 }}
            coordinate={{
              latitude: Number(user.latitude),
              longitude: Number(user.longitude),
            }}
          >
            <Callout
              onPress={() =>
                navigation.navigate("MerchantProfile", {
                  merchant_id: user.id,
                  merchant_name: user.name,
                  merchant_lat: user.latitude,
                  merchant_lng: user.longitude,
                })
              }
            >
              <Text>{user.name}</Text>
              <Text>
                {foodListQuery?.data
                  ? foodListQuery?.data
                      .filter((food) => food.merchant_id === user.id)
                      .map((food) => food.name)
                      .join(", ")
                  : undefined}
              </Text>
            </Callout>
          </Marker>
        ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
