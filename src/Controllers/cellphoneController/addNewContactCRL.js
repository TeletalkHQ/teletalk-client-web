import { addNewContactAPI } from "~/APIs/Cellphone/addNewContactAPI";

const addNewContactCRL = ({ cellphone, firstName, lastName }) => {
	return async (dispatch, getState) => {
		try {
			const contact = {
				cellphone,
				firstName,
				lastName,
			};

			const result = await addNewContactAPI(contact);
		} catch (error) {
			console.log("addNewContactCRL", error);
		}
	};
};

export { addNewContactCRL };
