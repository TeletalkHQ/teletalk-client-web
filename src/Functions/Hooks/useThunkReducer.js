import { useCallback, useReducer } from "react";

let useDispatch = () => {};

const useThunkReducer = (reducer, initialState) => {
	try {
		const [state, dispatch] = useReducer(reducer, initialState);

		const getState = useCallback(() => state, [state]);

		const myDispatch = useCallback(
			(action) => {
				return typeof action === "function" ? action(myDispatch, getState) : dispatch(action);
			},
			[getState],
		);

		useDispatch = useCallback(() => myDispatch, [myDispatch]);

		return [state, myDispatch];
	} catch (error) {
		throw error;
	}
};

export default useThunkReducer;

export { useThunkReducer, useDispatch };