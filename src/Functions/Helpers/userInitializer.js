import { tokenDecoder } from "~/Functions/Utils/tokenDecoder";

const userInitializer = () => {
	try {
		// FIXME CLEANME!
		const user = {
			cellphone: { phoneNumber: "", countryCode: "98", countryName: "iran" },
			privateID: "",
			verifyCode: "",
			mainToken: "",
			verifyToken: "",
		};

		const mainToken = localStorage.getItem("mainToken");

		if (!mainToken) {
			// const error = "mainToken not defined";
			localStorage.clear();
			// throw error;
			return user;
		}

		const { decodedToken } = tokenDecoder({ token: mainToken });
		delete decodedToken.iat;

		user.cellphone = decodedToken.cellphone;
		user.privateID = decodedToken.privateID;

		return user;
	} catch (error) {
		console.log("userInitializer catch", userInitializer);
		// throw error;
	}
};

export { userInitializer };
