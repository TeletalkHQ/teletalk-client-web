import { getAllStuffApi } from "apis/versionControlApis";

import { appOptions } from "classes/AppOptions";
import { eventManager } from "classes/EventManager";
import { stuffStore } from "classes/StuffStore";
import { persistentStorage } from "classes/PersistentStorage";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";

const getAllStuffController = () => {
  return async () => {
    try {
      const {
        data: { errors, models, routes, validationModels },
      } = await getAllStuffApi.sendRequest();

      persistentStorage.stringifyAndSetItem(PERSISTENT_STORAGE_KEYS.STUFFS, {
        errors,
        models,
        routes,
        validationModels,
      });

      stuffStore.updateAllStuff(errors, models, routes, validationModels);

      const {
        EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
      } = appOptions.getOptions();

      eventManager.emitEvent(ALL_STUFF_RECEIVED);
    } catch (error) {
      console.log("getAllStuffController", error);
      throw error;
    }
  };
};

export { getAllStuffController };
