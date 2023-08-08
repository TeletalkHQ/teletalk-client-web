import { AuthHandlers, AuthSetState } from "~/types";

export const handlers: (set: AuthSetState) => AuthHandlers = (set) => ({
  updateCountryCode(countryCode) {
    set({
      countryCode,
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
});
