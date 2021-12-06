import { Food } from "../types/Food";
import { User } from "../types/User";

export const filterUsers = (
  users: User[],
  foods: Food[],
  textSearch: string
): User[] => {
  const lowerCaseSearch = textSearch.toLowerCase();
  if (!users) return [];
  return users.filter(
    (user) =>
      user?.name?.toLowerCase()?.includes(lowerCaseSearch) ||
      foods?.some(
        (food) =>
          food?.name?.toLowerCase()?.includes(lowerCaseSearch) &&
          food?.merchant_id === user?.id
      )
  );
};

export const measure = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number | undefined => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return undefined;
  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Number((d * 1000).toFixed(0)); // meters
  // return d.toFixed(2); // kilometers
};

export const shouldUpdateCoords = (
  userLat?: number,
  userLng?: number,
  currentUserLat?: number,
  currentUserLng?: number
): boolean => {
  if (!userLat || !userLng) return true; // user dont have coords in DB

  if (!currentUserLat || !currentUserLng) return false; // user dont have actual coords

  const distance = measure(userLat, userLng, currentUserLat, currentUserLng);
  if (!distance) return false;

  if (Math.abs(distance) > 50) {
    // user is at least 50m from the last distance stored
    return true;
  } else {
    return false;
  }
};
