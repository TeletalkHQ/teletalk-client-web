//DEPRECATED

import { appOptions } from "classes/AppOptions";

//! Use it in special cases only!
let extractedDispatch = (action = appOptions.options.actionOptions) => {};

const dispatchInjector = (dispatch) => {
  extractedDispatch = (action) => {
    try {
      if (!action) {
        const error = "Yo! you must provide action!";
        throw error;
      }

      if (typeof action === "object" && !action.type) {
        const error = "Yo! you must provide action type";
        throw error;
      }

      dispatch(action);
    } catch (error) {
      console.log("extractedDispatch catch", error);
    }
  };
};

export { dispatchInjector, extractedDispatch };
