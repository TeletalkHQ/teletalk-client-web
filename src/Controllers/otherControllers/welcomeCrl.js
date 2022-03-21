import { welcomeApi } from "~/Apis/OtherApis/welcomeApi";

import { welcomeAction } from "~/Actions/OtherActions/otherActions";

const welcomeCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await welcomeApi();

      dispatch(welcomeAction({ message: response.data.message }));
    } catch (error) {
      console.log("welcomeCrl catch", error);
    }
  };
};

export { welcomeCrl };
