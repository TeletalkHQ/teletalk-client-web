import { INITIAL_STATE } from "~/Variables/constants/others";

const reducer = (state = INITIAL_STATE, action) => {
	try {
		switch (action.type) {
			case "test":
				return { hmmm: action.value };

			default:
				return state;
		}
	} catch (error) {}
};

export { reducer };
