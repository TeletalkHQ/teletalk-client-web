import { tokenDecoder } from "~/Functions/Utils/tokenDecoder";

const userInitializer = () => {
	try {
		const user = {
			bio: "",
			blacklist: [],
			phoneNumber: "",
			countryCode: "",
			countryName: "Select Country",
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

		console.log(user);

		const mainToken = localStorage.getItem("mainToken");

		if (!mainToken) {
			localStorage.clear();
			return user;
		}

		const { decodedToken } = tokenDecoder({ token: mainToken });

		delete decodedToken.iat;

		const { phoneNumber, countryCode, countryName, privateID } = decodedToken;

		console.log(...user, phoneNumber, countryCode, countryName, privateID);
		return { ...user, phoneNumber, countryCode, countryName, privateID };
	} catch (error) {
		console.log("userInitializer catch", userInitializer);
		// throw error;
	}
};

export { userInitializer };
