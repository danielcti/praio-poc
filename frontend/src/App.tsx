import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";
import Map from "./components/Map";

interface User {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [location, setLocation] = useState({
    latitude: 0,
    lontitude: 0,
  });
  const [myUser, setMyUser] = useState<User | undefined>(undefined);

  // create socket connection and hears for "users" event
  const registerSocket = () => {
    const socket = io("http://localhost:3333", { transports: ["websocket"] });
    socket.on("users", (users) => {
      setUsers(users);
    });
  };

  // add user to database
  const addUser = async () => {
    const response = await axios.post<User>("http://localhost:3333/user", {
      name,
      latitude: location.latitude,
      longitude: location.lontitude,
    });
    setMyUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  };

  // call registerSocket function when the page is mounted
  useEffect(() => {
    registerSocket();
  }, []);

  // gets the user from local storage when the page is mounted
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setMyUser(JSON.parse(user));
    }
  }, []);

  // fetch the users from database when the page is mounted
  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get<User[]>("http://localhost:3333/user");
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // update the location state when the navigator.geolocation updates
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }

    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        latitude: position.coords.latitude,
        lontitude: position.coords.longitude,
      });
    });
  }, [navigator.geolocation]);

  // update the user location to database when the location state changes
  useEffect(() => {
    async function updateUser() {
      if (myUser) {
        const response = await axios.put<User>("http://localhost:3333/user", {
          id: myUser?.id,
          name: myUser?.name,
          latitude: location.latitude,
          longitude: location.lontitude,
        });
        setMyUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    }
    updateUser();
  }, [location]);

  return (
    <div className="App">
      <h2>{myUser?.name}</h2>
      {!myUser && (
        <div className="form">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="type your name"
          />
          <button onClick={addUser}>Add user</button>
        </div>
      )}
      <Map users={users} />
    </div>
  );
}

export default App;