import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/initialActions";
import { initialAction } from "~/Variables/Constants/Initials/InitialOptions/initialOptions";
import { tempInitialState } from "~/Variables/Constants/Initials/InitialStates/initialStates";

const { contactSelectedInitialAction, messageInputInitialAction, setMessagesInitialAction } =
	tempInitialActions;

const tempReducer = (state = tempInitialState, action = initialAction) => {
	try {
		const { payload, type } = action;

		const stateMan = () => ({ ...state, ...payload });

		switch (type) {
			case contactSelectedInitialAction.type:
				return stateMan();

			case setMessagesInitialAction.type:
				return stateMan();

			case messageInputInitialAction.type:
				return stateMan();
			//
			//
			default:
				return state;
		}
	} catch (error) {
		console.log("tempReducer catch", error);
	}
};

export { tempReducer };
