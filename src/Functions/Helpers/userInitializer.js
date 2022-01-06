import { tokenDecoder } from "~/Functions/Utils/tokenDecoder";

const userInitializer = () => {
	try {
		const user = {
			bio: "",
			//FIXME
			blacklist: [
				{
					countryCode: "",
					countryName: "",
					phoneNumber: "",
				},
			],
			phoneNumber: "",
			countryCode: "98",
			countryName: "iran",
			chats: [{ chatID: "" }],
			contacts: [
				{ countryCode: "", countryName: "", firstName: "", lastName: "", phoneNumber: "" },
			],
			firstName: "",
			lastName: "",
			mainToken: "",
			privateID: "",
			username: "",
			verifyCode: "",
			verifyToken: "",
		};

		const mainToken = localStorage.getItem("mainToken");

		if (!mainToken) {
			localStorage.clear();
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
