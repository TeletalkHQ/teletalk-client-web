import { AuthHandlers, AuthSetState } from "~/types";

export const handlers = (set: AuthSetState) =>
  ({
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
  } as AuthHandlers);
