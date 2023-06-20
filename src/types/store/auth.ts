import { CountryItem } from "..";

export type StoreSetFn<StoreType> = (
  partial:
    | StoreType
    | Partial<StoreType>
    | ((state: StoreType) => StoreType | Partial<StoreType>),
  replace?: boolean | undefined
) => void;

export interface AuthHandlers {
  updateAuthenticationProgress: (value: boolean) => void;
  updateCountryCode: (value: string) => void;
  updateCountryName: (value: string) => void;
  updateFirstName: (value: string) => void;
  updateLastName: (value: string) => void;
  updatePhoneNumber: (value: string) => void;
  updateVerificationCode: (value: string) => void;
  updateSelectedCountry: (value: CountryItem | null) => void;
}

export interface AuthState {
  authenticationProgress: boolean;
  countryCode: string;
  countryName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedCountry: CountryItem | null;
  verificationCode: string;
}

export type AuthSetState = StoreSetFn<AuthState>;

export type AuthStore = AuthHandlers & AuthState;
