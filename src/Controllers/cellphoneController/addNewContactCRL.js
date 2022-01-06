import { addNewContactAPI } from "~/APIs/Cellphone/addNewContactAPI";

import { userActions } from "~/Variables/constants/Initials/InitialActions/initialActions";
import { initialState } from "~/Variables/constants/Initials/InitialStates/initialStates";

const addNewContactCRL = (contact) => {
	return async (dispatch, getState = initialState) => {
		try {
			const result = await addNewContactAPI(contact);

			dispatch({
				type: userActions.userAction.type,
				payload: {
					contacts: [...getState().user.contacts, result.data.contact],
				},
			});
		} catch (error) {
			console.log("addNewContactCRL", error);
		}
	};
};

export { addNewContactCRL };
