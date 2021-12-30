import { initialAction } from "~/Variables/constants/Initials/initialOptions";
import { otherInitialState } from "~/Variables/constants/Initials/initialStates";

const otherReducer = (state = otherInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = (newState) => ({ ...state, ...newState });

		switch (type) {
			case "WELCOME":
				return stateMan({ welcome: payload });

			case "USER_CHATS":
				return stateMan({ chats: payload });

			case "INPUT_TEXT":
				return stateMan({ messageInputText: payload });

			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
