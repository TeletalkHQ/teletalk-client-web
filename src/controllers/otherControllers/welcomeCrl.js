import { welcomeApi } from "~/apis/otherApis/welcomeApi";

import { welcomeAction } from "~/actions/otherActions/otherActions";

const welcomeCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await welcomeApi();

      dispatch(welcomeAction({ message: response.data.message }));
    } catch (error) {
      logger.log("welcomeCrl catch", error);
    }
  };
};

export { welcomeCrl };
