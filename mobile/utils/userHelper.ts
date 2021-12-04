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
