import { trier } from "utility-store/src/classes/Trier";

const tryToExecuteCase = ({ action, reducerCases, state }) => {
  const { payload, type } = action;

  const reducerCase = reducerCases[type];

  if (reducerCase) {
    return reducerCase(state, payload);
  }

  return state;
};

const reducerTrier = ({ action, callerName, reducerCases, state }) => {
  return trier(callerName)
    .try(tryToExecuteCase, {
      action,
      reducerCases,
      state,
    })
    .printError()
    .catch(() => state)
    .result();
};

const triers = { reducerTrier };

export { triers };
