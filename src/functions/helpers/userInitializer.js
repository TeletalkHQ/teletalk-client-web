import { persistentStorage } from "classes/PersistentStorage";

import { tokenDecoder } from "functions/utilities/tokenDecoder";

//REDESIGN
const userInitializer = () => {
  try {
    const defaultUserState = {
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
    };

    const mainToken = persistentStorage.getItem({ key: "mainToken" });

    if (!mainToken) {
      persistentStorage.setDefaultStorage();
      return defaultUserState;
    }

    const { decodedToken } = tokenDecoder({ token: mainToken });

    const { phoneNumber, countryCode, countryName, privateId } = decodedToken;

    return {
      ...defaultUserState,
      phoneNumber,
      countryCode,
      countryName,
      privateId,
    };
  } catch (error) {
    console.log("userInitializer catch", error);
    // throw error;
  }
};

export { userInitializer };
