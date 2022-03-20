import { StuffStore } from "~/Functions/Utils/StuffStore";
import { emitters } from "~/Functions/Events/Emitters";

import { getAllStuffApi } from "~/APIs/VersionControlApis/getAllStuffApi";

import { EVENT_EMITTER_EVENTS } from "~/Variables/Constants/Others/otherConstants";

const getAllStuffCrl = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getAllStuffApi();
      console.log(response);

      StuffStore.schemas = response.data.schemas;
      StuffStore.templates = response.data.templates;

      emitters.emitEvent({ event: EVENT_EMITTER_EVENTS });
    } catch (error) {
      logger._log("getAllStuffCrl", error);
    }
  };
};

export { getAllStuffCrl };
