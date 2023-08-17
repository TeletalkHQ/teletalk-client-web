import { Cellphone } from "utility-store/lib/types";

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
  reset: VoidNoArgsFn;
  updateCellphone: (c: Partial<Cellphone>) => void;
  updateCountryCode: (value: string) => void;
  updateCountryName: (value: string) => void;
  updateFirstName: (value: string) => void;
  updateLastName: (value: string) => void;
  updatePhoneNumber: (value: string) => void;
  updateSelectedCountry: (value: SelectedCountry) => void;
  updateVerificationCode: (value: string) => void;
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
