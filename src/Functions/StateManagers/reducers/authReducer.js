import { auth } from "~/Variables/constants/initialStates";

const authReducer = (state = auth, action) => {
	try {
		switch (action.type) {
			default:
				return state;
		}
	} catch (error) {}
};

export { authReducer };
