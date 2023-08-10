import {
  FirstName,
  LastName,
  PhoneNumber,
  SelectedCountry,
  StoreSetFn,
  VerificationCode,
  VoidNoArgsFn,
} from "~/types";

export interface AuthHandlers {
  updateCountryCode: (value: string) => void;
  updateCountryName: (value: string) => void;
  updateFirstName: (value: string) => void;
  updateLastName: (value: string) => void;
  updatePhoneNumber: (value: string) => void;
  updateVerificationCode: (value: string) => void;
  updateSelectedCountry: (value: SelectedCountry) => void;
  reset: VoidNoArgsFn;
}

export interface AuthState {
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
