import { Cellphone, CountryCode, CountryName } from "utility-store/lib/types";

import {
  FirstName,
  LastName,
  PhoneNumber,
  SelectedCountry,
  StoreSetFn,
  VerificationCode,
  VoidNoArgsFn,
  VoidWithArg,
} from "~/types";

export interface AuthHandlers {
  reset: VoidNoArgsFn;
  updateCellphone: VoidWithArg<Partial<Cellphone>>;
  updateCountryCode: VoidWithArg<CountryCode>;
  updateCountryName: VoidWithArg<CountryName>;
  updateFirstName: VoidWithArg<FirstName>;
  updateLastName: VoidWithArg<LastName>;
  updatePhoneNumber: VoidWithArg<PhoneNumber>;
  updateSelectedCountry: VoidWithArg<SelectedCountry>;
  updateVerificationCode: VoidWithArg<VerificationCode>;
}

export interface AuthState {
  countryCode: CountryCode;
  countryName: CountryName;
  firstName: FirstName;
  lastName: LastName;
  phoneNumber: PhoneNumber;
  selectedCountry: SelectedCountry;
  verificationCode: VerificationCode;
}

export type AuthSetState = StoreSetFn<AuthState>;

export type AuthStore = AuthHandlers & AuthState;
