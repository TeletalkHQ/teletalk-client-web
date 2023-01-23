import { variables } from "src/variables";

const initialAuthState = () => ({
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  selectedCountry: variables.common.object.country(),
  verificationCode: "",
});

export { initialAuthState };
