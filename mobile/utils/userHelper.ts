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
): string | undefined => {
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
  return (d * 1000).toFixed(0) + "m"; // meters
  // return d.toFixed(2); // kilometers
};
