import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { otherInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const otherReducer = (state = otherInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = () => ({ ...state, ...payload });

		switch (type) {
			case "WELCOME":
				return stateMan();

			case "USER_CHATS":
				return stateMan();

			case "INPUT_TEXT":
				return stateMan();

			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
