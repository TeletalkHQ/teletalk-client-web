import { getAllStuffApi } from "staticApis/versionControlApis";

import { appOptions } from "classes/AppOptions";
import { emitters } from "classes/Emitters";
import { stuffStore } from "classes/StuffStore";
import { persistentStorage } from "classes/PersistentStorage";

import { PERSISTENT_STORAGE_KEYS } from "variables/others/staticValues";

const getAllStuffController = () => {
  return async (dispatch) => {
    try {
      const {
        data: { errors, models, routes, validationModels },
      } = await getAllStuffApi.sendRequest();

      persistentStorage.convertAndSetItem(PERSISTENT_STORAGE_KEYS.STUFFS, {
        errors,
        models,
        routes,
        validationModels,
      });

      stuffStore.updateAllStuff(errors, models, routes, validationModels);

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
