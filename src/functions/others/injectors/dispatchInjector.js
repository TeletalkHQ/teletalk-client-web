import { initialAction } from "variables/constants/initials/initialOptions/initialOptions";

//! Using it in special cases only!
let appDispatch = (action = initialAction) => {};

const dispatchInjector = ({ dispatch }) => {
  appDispatch = (action) => {
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
      console.log("appDispatch catch", error);
    }
  };
};

export { dispatchInjector, appDispatch };
