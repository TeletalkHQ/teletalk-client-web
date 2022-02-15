import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { otherInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

const otherReducer = (state = otherInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const fn = () => newStateReplacer({ state, payload });

		switch (type) {
			case "WELCOME":
				return fn();

			case "USER_CHATS":
				return fn();

			case "INPUT_TEXT":
				return fn();

			default:
				return state;
		}
	} catch (error) {}
};

export { otherReducer };
