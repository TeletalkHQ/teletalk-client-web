import { INITIAL_STATE } from "~/Variables/constants/others";

const reducer = (action, state = INITIAL_STATE) => {
	try {
		switch (action.type) {
			case "value":
				break;

			default:
				return state;
		}
	} catch (error) {}
};

export { reducer };
