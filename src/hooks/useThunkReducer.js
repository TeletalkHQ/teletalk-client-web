import { useCallback, useReducer } from "react";

import { appDispatch } from "functions/injectors/dispatchInjector";

import { initialStates } from "variables/initials/initialStates/initialStates";

let useDispatch = () => appDispatch;
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
        return typeof action === "function"
          ? action(dispatch, getState)
          : (() => {
              configs.actionLogger && actionLogger(action);
              dispatch(action);
            })();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [getState, dispatch]
    );

    useDispatch = useCallback(() => customDispatch, [customDispatch]);
    useSelector = useCallback(() => state, [state]);

    return [state, customDispatch];
  } catch (error) {
    throw error;
  }
};

export default useThunkReducer;

export {
  actionLogger,
  combineReducers,
  useDispatch,
  useSelector,
  useThunkReducer,
};
