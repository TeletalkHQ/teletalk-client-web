import { useCallback, useReducer } from "react";

let useDispatch = () => {};

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

		return [state, myDispatch];
	} catch (error) {
		throw error;
	}
};

export default useThunkReducer;

export { useThunkReducer, useDispatch, combineReducers };
