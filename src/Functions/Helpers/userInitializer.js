import { tokenDecoder } from "~/Functions/Utils/tokenDecoder";
import { PersistentStorage } from "~/Functions/Utils/PersistentStorage";

const userInitializer = () => {
	try {
		const user = {
			bio: "",
			blacklist: [],
			phoneNumber: "",
			countryCode: "",
			countryName: "",
			chats: [],
			contacts: [],
			firstName: "",
			lastName: "",
			mainToken: "",
			privateID: "",
			username: "",
			verifyCode: "",
			verifyToken: "",
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
