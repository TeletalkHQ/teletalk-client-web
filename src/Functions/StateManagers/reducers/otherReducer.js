import { other } from "~/Variables/constants/initialStates";

const initialAction = { type: "", payload: "" };

const otherReducer = (state = other, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = (newState) => ({ ...state, ...newState });

		switch (type) {
			case "WELCOME":
				return stateMan({ welcome: payload });

			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
