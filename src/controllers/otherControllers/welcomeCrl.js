import { welcomeAction } from "actions/otherActions/otherActions";
import { welcomeApi } from "apis/otherApis";

const welcomeCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await welcomeApi.sendRequest();

      dispatch(welcomeAction({ message: response.data.message }));
    } catch (error) {
      console.log("welcomeCrl catch", error);
    }
  };
};

export { welcomeCrl };
