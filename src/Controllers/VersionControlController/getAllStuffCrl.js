import { StuffStore } from "~/Functions/Utils/StuffStore";

import { getAllStuffApi } from "~/APIs/VersionControlApis/getAllStuffVersionControlApi";

const getAllStuffCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllStuffApi();
      console.log(response);

      StuffStore.schemas = response.data.schemas;
      StuffStore.templates = response.data.templates;
    } catch (error) {
      logger._log("getAllStuffCrl", error);
    }
  };
};

export { getAllStuffCrl };
