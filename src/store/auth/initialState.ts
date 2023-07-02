import { AuthState } from "~/types";

export const initialState: AuthState = {
  authenticationProgress: false,
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  selectedCountry: null,
  verificationCode: "",
};
