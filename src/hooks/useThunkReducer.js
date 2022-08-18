import { useCallback, useReducer } from "react";

import { customTypeof } from "classes/CustomTypeof";

import { printCatchError } from "functions/utilities/otherUtilities";

import { initialStates } from "variables/initials/initialStates/initialStates";

//! Use it in special cases only!
let extractedDispatch = (action = { type: "", payload: {} }) => {};
let extractedDispatchAsync = async (action = { type: "", payload: {} }) => {};
let useDispatch = () => extractedDispatch;
let useSelector = () => initialStates;
let actionLogger = (action) => {
  console.log(`actionLogger:`, action);
};

const defaultConfigs = {
  actionLogger: false,
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
};

const useThunkReducer = (reducer, initialState, configs = defaultConfigs) => {
  try {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getState = useCallback(() => state, [state]);

    const customDispatch = useCallback(
      (action) => {
        return customTypeof.check(action).type.function
          ? action(dispatch, getState)
          : (() => {
              configs.actionLogger && actionLogger(action);
              dispatch(action);
            })();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getState, dispatch]
    );

    extractedDispatch = customDispatch;
    extractedDispatchAsync = async (action) => customDispatch(action);
    useDispatch = useCallback(() => customDispatch, [customDispatch]);
    useSelector = useCallback(() => state, [state]);

    return [state, customDispatch];
  } catch (error) {
    printCatchError(useThunkReducer.name, error);
    throw error;
  }
};

export default useThunkReducer;

export {
  actionLogger,
  combineReducers,
  extractedDispatch,
  extractedDispatchAsync,
  useDispatch,
  useSelector,
  useThunkReducer,
};
