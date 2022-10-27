import { useCallback, useReducer } from "react";

import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { printCatchError } from "functions/utilities/otherUtilities";

import { getInitialState } from "variables/initials/states";

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
const initialUseSelectorCallbackParam = (state = getInitialState()) => {
  return state;
};
let useSelector = (callback = initialUseSelectorCallbackParam) => {
  return callback();
};

const actionLogger = (action) => {
  logger.debug("action:", action);
};

const defaultConfigs = {
  logActions: false,
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

const dispatcher = ({ action, configs, dispatch, getState }) => {
  return customTypeof.isFunction(action)
    ? action(dispatch, getState)
    : (() => {
        if (configs.logActions) actionLogger(action);
        dispatch(action);
      })();
};

const useThunkReducer = (reducer, initialState, configs = defaultConfigs) => {
  try {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getState = useCallback(() => state, [state]);

    const customDispatch = useCallback(
      (action) =>
        dispatcher({
          action,
          configs,
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
    printCatchError(useThunkReducer.name, error);
    throw error;
  }
};

export default useThunkReducer;

export {
  combineReducers,
  extractedDispatch,
  extractedDispatchAsync,
  useDispatch,
  useSelector,
  useThunkReducer,
};
