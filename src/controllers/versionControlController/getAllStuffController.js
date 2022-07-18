import { getAllStuffApi } from "apis/versionControlApis";

import { appOptions } from "classes/AppOptions";
import { emitters } from "classes/Emitters";
// import { stuffStore } from "classes/StuffStore";

const getAllStuffController = () => {
  return async (dispatch, getState) => {
    try {
      // const response =
      await getAllStuffApi.sendRequest();

      emitters.emitEvent({
        event: appOptions.options.EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED,
      });
    } catch (error) {
      console.log("getAllStuffController", error);
      throw error;
    }
  };
};

export { getAllStuffController };
