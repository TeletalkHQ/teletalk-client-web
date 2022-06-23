// import { stuffStore } from "classes/StuffStore";
import { emitters } from "classes/Emitters";

import { getAllStuffApi } from "apis/versionControlApis";
import { EVENT_EMITTER_EVENTS } from "configs/configs";

const getAllStuffCrl = () => {
  return async (dispatch, getState) => {
    try {
      // const response =
      await getAllStuffApi.sendRequest();

      emitters.emitEvent({ event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED });
    } catch (error) {
      console.log("getAllStuffCrl", error);
      throw error;
    }
  };
};

export { getAllStuffCrl };
