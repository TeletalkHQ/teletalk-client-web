import { getAllStuffApi } from "apis/versionControlApis";

import { appOptions } from "classes/AppOptions";
import { eventManager } from "classes/EventManager";
import { persistentStorage } from "classes/PersistentStorage";
import { stuffStore } from "classes/StuffStore";

import { printCatchError } from "functions/utilities/otherUtilities";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/constants";

const getAllStuffController = () => {
  return async () => {
    try {
      const {
        data: { errors, models, routes, validationModels, languageData },
      } = await getAllStuffApi.sendFullFeaturedRequest({
        language: "en",
      });

      persistentStorage.stringifyAndSetItem(PERSISTENT_STORAGE_KEYS.STUFFS, {
        errors,
        models,
        routes,
        validationModels,
        languageData,
      });

      stuffStore.updateAllStuff(
        errors,
        models,
        routes,
        validationModels,
        languageData
      );

      const {
        EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
      } = appOptions.getOptions();

      eventManager.emitEvent(ALL_STUFF_RECEIVED);
    } catch (error) {
      printCatchError(getAllStuffController.name, error);
      throw error;
    }
  };
};

export { getAllStuffController };
