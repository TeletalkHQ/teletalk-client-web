import { signInAPI } from "~/APIs/Auth/signInAPI";

const signInCRL = async ({ cellphone: { phoneNumber, countryCode, countryName } }) => {
	const response = await signInAPI({ phoneNumber, countryCode: "98", countryName: "ir" });

	console.log(response);
};

export { signInCRL };
