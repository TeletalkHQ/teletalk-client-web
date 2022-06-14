import { stuffStore } from "classes/StuffStore";
import { emitters } from "classes/Emitters";

import { EVENT_EMITTER_EVENTS } from "variables/constants/others/otherConstants";
import { getAllStuffApi } from "apis/versionControlApis";

const getAllStuffCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllStuffApi();
      console.log(response);

      stuffStore.schemas = response.data.schemas;
      stuffStore.templates = response.data.templates;

      emitters.emitEvent({ event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED });
    } catch (error) {
      console.log("getAllStuffCrl", error);
    }
  };
};

export { getAllStuffCrl };
