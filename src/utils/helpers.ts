import { UserData, UserType } from "../types";

export const filterUsers = (users: UserData, searchQuery: string): UserData => {
  return users.filter(
    (user: UserType) =>
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.items.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.pincode.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
