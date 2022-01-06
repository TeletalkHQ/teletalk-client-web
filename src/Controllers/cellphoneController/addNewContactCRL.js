import { addNewContactAPI } from "~/APIs/Cellphone/addNewContactAPI";

import { authActions } from "~/Variables/constants/Initials/initialActions";
import { initialState } from "~/Variables/constants/Initials/initialStates";

const addNewContactCRL = (contact) => {
	return async (dispatch, getState = initialState) => {
		try {
			const result = await addNewContactAPI(contact);

			dispatch({
				type: authActions.userAction.type,
				payload: {
					contacts: [...getState().auth.userState.contacts, result.data.contact],
				},
			});
		} catch (error) {
			console.log("addNewContactCRL", error);
		}
	};
};

export { addNewContactCRL };
