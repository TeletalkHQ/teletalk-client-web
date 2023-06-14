import { produce } from "immer";
import { create } from "zustand";
import { CountryItem } from "~/types";

interface AuthStore {
  authenticationProgress: boolean;
  countryCode: string;
  countryName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedCountry: CountryItem | null;
  verificationCode: string;

  updateAuthenticationProgress: (value: boolean) => void;
  updateCountryCode: (value: string) => void;
  updateCountryName: (value: string) => void;
  updateFirstName: (value: string) => void;
  updateLastName: (value: string) => void;
  updatePhoneNumber: (value: string) => void;
  updateVerificationCode: (value: string) => void;
  updateSelectedCountry: (value: CountryItem | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authenticationProgress: false,
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  selectedCountry: null,
  verificationCode: "",

  updateCountryCode(countryCode) {
    return set({
      countryCode,
    });
  },
  updateAuthenticationProgress(authenticationProgress) {
    return set({
      authenticationProgress,
    });
  },
  updateCountryName(countryName) {
    return set({
      countryName,
    });
  },
  updatePhoneNumber(phoneNumber) {
    return set({
      phoneNumber,
    });
  },
  updateVerificationCode(verificationCode) {
    return set({
      verificationCode,
    });
  },
  updateFirstName(firstName) {
    return set({
      firstName,
    });
  },
  updateLastName(lastName) {
    return set({
      lastName,
    });
  },
  updateSelectedCountry(selectedCountry) {
    return set({ selectedCountry });
  },
}));
