import { getAllStuffVersionControlApi } from "~/APIs/VersionControlApis/getAllStuffVersionControlApi";

const getAllStuffCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = getAllStuffVersionControlApi();
      console.log(response);
    } catch (error) {
      logger._log("getAllStuffCrl", error);
    }
  };
};

export { getAllStuffCrl };
