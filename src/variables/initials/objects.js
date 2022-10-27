const initialObjects = {
  contact: () => ({
    countryCode: "",
    countryName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userId: "",
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
