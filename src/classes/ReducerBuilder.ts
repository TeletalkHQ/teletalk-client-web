import { trier } from "simple-trier";

import { variables } from "src/variables";

class ReducerBuilder {
  #options = {
    action: {
      payload: {},
      type: "",
    },
    initialState: {},
    reducerCases: "",
    reducerName: "",
  };

  #editOption(name, value) {
    this.#options[name] = value;
  }

  reducerName(reducerName) {
    this.#editOption("reducerName", reducerName);
    return this;
  }
  reducerCases(reducerCases) {
    this.#editOption("reducerCases", reducerCases);
    return this;
  }
  initialState(initialState) {
    this.#editOption("initialState", initialState);
    return this;
  }

  build() {
    const { initialState, reducerCases, reducerName } = this.#options;

    const items = [initialState, reducerCases, reducerName];
    items.forEach((item) => {
      if (!item) {
        // eslint-disable-next-line no-throw-literal
        throw {
          ...variables.notification.error.REQUIREMENT_ITEM_MISSING,
          allItems: items,
        };
      }
    });

    return (state = this.initialState, action = this.action) => {
      return this.#mergePrevStateWithNewState(
        state,
        this.#reducerTrier({
          action,
          callerName: this.#options.reducerName,
          reducerCases: this.#options.reducerCases,
          state,
        })
      );
    };
  }

  #mergePrevStateWithNewState(prevState, newState) {
    return {
      ...prevState,
      ...newState,
    };
  }

  #reducerTrier({ action, callerName, reducerCases, state }) {
    return trier(callerName)
      .try(this.#tryToExecuteCase, {
        action,
        reducerCases,
        state,
      })

      .catch(() => state)
      .run();
  }

  #tryToExecuteCase({ action, reducerCases, state }) {
    const { payload, type } = action;

    const reducerCase = reducerCases[type];

    if (reducerCase) {
      return reducerCase(payload, state);
    }

    return state;
  }
}

const reducerBuilder = { create: () => new ReducerBuilder() };

export { ReducerBuilder, reducerBuilder };
