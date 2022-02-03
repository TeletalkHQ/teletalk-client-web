import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { tempInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";
import { newStateReplacer } from "~/Functions/Utils/stateUtils/stateUtils";

const {
	contactSelectedInitialAction,
	messageInputInitialAction,
	onlineStatusInitialAction,
	setMessagesInitialAction,
} = tempInitialActions;

const tempReducer = (state = tempInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const fn = () => newStateReplacer({ state, payload });

		switch (type) {
			case contactSelectedInitialAction.type:
				return fn();

			case setMessagesInitialAction.type:
				return fn();

			case messageInputInitialAction.type:
				return fn();

			case onlineStatusInitialAction.type:
				return fn();

			default:
				return state;
		}
	} catch (error) {
		console.log("tempReducer catch", error);
	}
};

export { tempReducer };
