import { useCallback, useReducer } from "react";

import { appDispatch } from "~/Functions/Others/Injectors/dispatchInjector";

import { INITIAL_STATE } from "~/Variables/Constants/Initials/InitialStates/initialStates";

let useDispatch = () => appDispatch;
let useSelector = () => INITIAL_STATE;
// let reducerLogger = () => {};

const combineReducers = (reducers) => {
	return (state = {}, action) => {
		const newState = {};
		for (let key in reducers) {
			newState[key] = reducers[key](state[key], action);
		}
		return newState;
	};
};

const useThunkReducer = (reducer, initialState) => {
	try {
		const [state, dispatch] = useReducer(reducer, initialState);

		const getState = useCallback(() => state, [state]);

		const myDispatch = useCallback(
			(action) => {
				return typeof action === "function" ? action(dispatch, getState) : dispatch(action);
			},
			[getState, dispatch],
		);

		useDispatch = useCallback(() => myDispatch, [myDispatch]);
		useSelector = useCallback(() => state, [state]);

		return [state, myDispatch];
	} catch (error) {
		throw error;
	}
};

export default useThunkReducer;

export { useThunkReducer, useDispatch, combineReducers, useSelector };
