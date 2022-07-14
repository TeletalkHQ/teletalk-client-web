import { welcomeAction } from "actions/otherActions";

import { welcomeApi } from "apis/otherApis";

const welcomeController = () => {
  return async (dispatch, getState) => {
    try {
      const response = await welcomeApi.sendRequest();

      dispatch(welcomeAction({ message: response.data.message }));
    } catch (error) {
      console.log("welcomeController catch", error);
    }
  };
};

export { welcomeController };
