import { UserState } from "~/types";

const initialState: UserState = {
  bio: "",
  countryCode: "1",
  countryName: "United States",
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

export { initialState };
