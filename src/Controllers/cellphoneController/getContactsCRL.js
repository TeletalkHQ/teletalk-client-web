import { getContactsAPI } from "~/APIs/Cellphone/getContactsAPI";

const getContactsCRL = () => {
	return async (dispatch, getState) => {
		try {
			const result = await getContactsAPI();

			console.log(result);
		} catch (error) {}
	};
};

export { getContactsCRL };
