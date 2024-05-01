export type UserType = {
  id: string;
  name: string;
  items: Array<string>;
  address: string;
  pincode: string;
};

export type UserData = UserType[];
