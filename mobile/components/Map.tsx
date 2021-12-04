import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { User } from "../types/User";
import { useUser } from "../hooks/user";
import { useFood } from "../hooks/food";
import { useNavigation } from "@react-navigation/core";

interface MapProps {
  location: any;
  users: User[];
}

export default function Map({ location, users }: MapProps) {
  const { userSession } = useUser();
  const { foodListQuery } = useFood();
  const navigation = useNavigation();

  return (
    <MapView
      style={styles.container}
      initialRegion={{
        latitude: location?.coords?.latitude || -8.0990952,
        longitude: location?.coords?.longitude || -34.8828124,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
      }}
    >
      {location?.coords && (
        <Marker
          coordinate={{
            latitude: Number(location.coords.latitude),
            longitude: Number(location.coords.longitude),
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
