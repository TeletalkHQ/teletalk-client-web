import { StuffStore } from "~/functions/utils/StuffStore";
import { emitters } from "~/functions/events/Emitters";

import { getAllStuffApi } from "~/apis/versionControlApis/getAllStuffApi";

import { EVENT_EMITTER_EVENTS } from "~/variables/constants/others/otherConstants";

const getAllStuffCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllStuffApi();
      logger.log(response);

      StuffStore.schemas = response.data.schemas;
      StuffStore.templates = response.data.templates;

      emitters.emitEvent({ event: EVENT_EMITTER_EVENTS.ALL_STUFF_RECEIVED });
    } catch (error) {
      logger.log("getAllStuffCrl", error);
    }
  };
};

export { getAllStuffCrl };
