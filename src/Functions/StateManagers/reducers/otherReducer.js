import { other } from "~/Variables/constants/initialStates";

const otherReducer = (state = other, action) => {
	try {
		switch (action.type) {
			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
