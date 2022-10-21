const initialObjects = {
  contact: () => ({
    countryCode: "",
    countryName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    privateId: "",
  }),
  country: () => ({
    countryCode: "",
    countryName: "",
    countryShortName: "",
  }),
  message: () => ({
    messageId: "",
    senderId: "",
    text: "",
  }),
};

export { initialObjects };
