import { variables } from "variables";

const initialAuthState = () => ({
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  messageInputTextValue: "",
  phoneNumber: "",
  selectedCountry: variables.common.object.country(),
  verificationCode: "",
});

export { initialAuthState };
