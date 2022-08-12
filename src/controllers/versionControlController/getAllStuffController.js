import { getAllStuffApi } from "staticApis/versionControlApis";

import { appOptions } from "classes/AppOptions";
import { emitters } from "classes/Emitters";
import { stuffStore } from "classes/StuffStore";

const getAllStuffController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { errors, models, routes },
      } = await getAllStuffApi.sendRequest();

      stuffStore.updateErrors(errors).updateModels(models).updateRoutes(routes);

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
