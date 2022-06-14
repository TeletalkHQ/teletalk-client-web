import { tokenDecoder } from "functions/utils/tokenDecoder";
import { PersistentStorage } from "classes/PersistentStorage";

//REDESIGN
const userInitializer = () => {
  try {
    const user = {
      bio: "",
      blacklist: [],
      chats: [],
      contacts: [],
      countryCode: "",
      countryName: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      privateID: "",
      username: "",
    };

    const mainToken = PersistentStorage.getItem({ key: "mainToken" });

    if (!mainToken) {
      PersistentStorage.clear();
      return user;
    }

    const { decodedToken } = tokenDecoder({ token: mainToken });

    delete decodedToken.iat;

    const { phoneNumber, countryCode, countryName, privateID } = decodedToken;

    return { ...user, phoneNumber, countryCode, countryName, privateID };
  } catch (error) {
    console.log("userInitializer catch", userInitializer);
    // throw error;
  }
};

export { userInitializer };
