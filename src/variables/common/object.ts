const commonObject = {
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
  action: { type: "", payload: {} },
};

export { commonObject };
