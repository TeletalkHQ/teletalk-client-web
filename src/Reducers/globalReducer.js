import { globalActions } from "~/Variables/constants/Initials/initialActions";
import { globalInitialState } from "~/Variables/constants/Initials/initialStates";
import { initialAction } from "~/Variables/constants/Initials/initialOptions";

const { appDrawerAction, backdropAction, viewModeAction, dialogAction } = globalActions;

const globalReducer = (state = globalInitialState, action = initialAction) => {
	const { payload, type } = action;

	const stateMan = (newState) => ({ ...state, ...newState });

	try {
		switch (type) {
			case viewModeAction.type:
				return stateMan({ ...payload });

			case backdropAction.type:
				return stateMan({ backdropState: { ...state.backdropState, ...payload } });

			case appDrawerAction.type:
				return stateMan({
					appDrawerState: {
						...state.appDrawerState,
						anchor: { ...state.appDrawerState.anchor, [payload.anchor]: payload.open },
					},
				});

			case dialogAction.type:
				return stateMan({
					dialogState: {
						...state.dialogState,
						...payload,
					},
				});

			default:
				return state;
		}
	} catch (error) {
		console.log("globalReducer catch", error);
	}
};

export { globalReducer };
