import { UserState } from "~/types";

export const initialState: UserState = {
  bio: "",
  contacts: [],
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
