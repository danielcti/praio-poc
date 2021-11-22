import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface User {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  users: User[];
}

const Map = ({ users }: MapProps) => {
  return (
    <MapContainer
      style={{ width: "100vw", height: "calc(100vh - 100px)" }}
      center={[-8.0576512, -34.9929472]}
      zoom={8}
    >
      <TileLayer
        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
      {users.map((user) => {
        return (
          <Marker position={[user.latitude, user.longitude]} key={user.id}>
            <Popup>
              <h3>{user.name}</h3>
              <span>
                {user.latitude}, {user.longitude}
              </span>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
