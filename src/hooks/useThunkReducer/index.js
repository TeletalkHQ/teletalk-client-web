import { useCallback, useReducer } from "react";

import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { initialStates } from "store/initialStates";

import { utilities } from "utilities";

//! Use it in special cases only!
let extractedDispatch = (
  action = {
    payload: {},
    type: "",
  }
) => action;
let extractedDispatchAsync = async (action = { type: "", payload: {} }) =>
  action;

let useDispatch = () => extractedDispatch;

const initialUseSelectorCallbackParam = (state = initialStates()) => {
  return state;
};
let useSelector = (callback = initialUseSelectorCallbackParam) => {
  return callback();
};

const dispatcher = ({ action, dispatch, getState }) => {
  return customTypeof.isFunction(action)
    ? action(dispatch, getState)
    : dispatch(action);
};

const useThunkReducer = (reducer, initialState) => {
  try {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getState = () => state;

    const customDispatch = useCallback(
      (action) =>
        dispatcher({
          action,
          dispatch,
          getState,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getState, dispatch]
    );

    extractedDispatch = customDispatch;
    extractedDispatchAsync = async (action) => await customDispatch(action);
    useDispatch = useCallback(() => customDispatch, [customDispatch]);
    useSelector = useCallback(
      (callback = initialUseSelectorCallbackParam) => callback(state),
      [state]
    );

    return [state, customDispatch];
  } catch (error) {
    utilities.printCatchError(useThunkReducer.name, error);
    throw error;
  }
};

export default useThunkReducer;

export {
  extractedDispatch,
  extractedDispatchAsync,
  useDispatch,
  useSelector,
  useThunkReducer,
};
