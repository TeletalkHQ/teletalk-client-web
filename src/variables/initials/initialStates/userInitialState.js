const defaultUserState = () => ({
  bio: "",
  blacklist: [],
  chats: [],
  contacts: [],
  countryCode: "",
  countryName: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  privateId: "",
  username: "",
});

const userInitialState = defaultUserState();

export { defaultUserState, userInitialState };
