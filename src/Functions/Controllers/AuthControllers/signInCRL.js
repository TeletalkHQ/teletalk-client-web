import { signInAPI } from "~/APIs/Auth/signInAPI";

const signInCRL = async (data) => {
	try {
		const response = await signInAPI(data);

		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export { signInCRL };
