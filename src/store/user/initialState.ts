import { UserState } from "~/types";

export const initialState: UserState = {
  bio: "",
  countryCode: "",
  countryName: "",
  createdAt: 0,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  status: {
    isActive: false,
  },
  userId: "",
  username: "",
};
