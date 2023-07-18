import {
  FirstName,
  LastName,
  PhoneNumber,
  SelectedCountry,
  StoreSetFn,
  VerificationCode,
} from "~/types";

export interface AuthHandlers {
  updateAuthenticationProgress: (value: boolean) => void;
  updateCountryCode: (value: string) => void;
  updateCountryName: (value: string) => void;
  updateFirstName: (value: string) => void;
  updateLastName: (value: string) => void;
  updatePhoneNumber: (value: string) => void;
  updateVerificationCode: (value: string) => void;
  updateSelectedCountry: (value: SelectedCountry) => void;
}

export interface AuthState {
  authenticationProgress: boolean;
  countryCode: string;
  countryName: string;
  firstName: FirstName;
  lastName: LastName;
  phoneNumber: PhoneNumber;
  selectedCountry: SelectedCountry;
  verificationCode: VerificationCode;
}

export type AuthSetState = StoreSetFn<AuthState>;

export type AuthStore = AuthHandlers & AuthState;
