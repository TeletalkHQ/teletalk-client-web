import { getAllStuffApi } from "apis/versionControlApis";

import { emitters } from "classes/Emitters";
// import { stuffStore } from "classes/StuffStore";

import { EVENT_EMITTER_EVENTS } from "configs/configs";

const getAllStuffController = () => {
  return async (dispatch, getState) => {
    try {
      // const response =
      await getAllStuffApi.sendRequest();

      emitters.emitEvent({ event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED });
    } catch (error) {
      console.log("getAllStuffController", error);
      throw error;
    }
  };
};

export { getAllStuffController };
