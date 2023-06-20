import { AuthHandlers, AuthSetState } from "~/types";

export const handlers = (set: AuthSetState) =>
  ({
    updateCountryCode(countryCode) {
      set({
        countryCode,
      });
    },
    updateAuthenticationProgress(authenticationProgress) {
      set({
        authenticationProgress,
      });
    },
    updateCountryName(countryName) {
      set({
        countryName,
      });
    },
    updatePhoneNumber(phoneNumber) {
      set({
        phoneNumber,
      });
    },
    updateVerificationCode(verificationCode) {
      set({
        verificationCode,
      });
    },
    updateFirstName(firstName) {
      set({
        firstName,
      });
    },
    updateLastName(lastName) {
      set({
        lastName,
      });
    },
    updateSelectedCountry(selectedCountry) {
      set({ selectedCountry });
    },
  } as AuthHandlers);
