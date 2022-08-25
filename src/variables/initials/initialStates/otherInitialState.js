import { initialContact } from "variables/initials/initialValues/initialValues";

const defaultOtherState = () => ({
  countries: [],
  messages: [],
  messageInputText: "",
  selectedContact: initialContact,
  welcomeMessage: "",
});
const otherInitialState = defaultOtherState();

export { defaultOtherState, otherInitialState };
