import { trier } from "utility-store/src/classes/Trier";
import { eventManager } from "utility-store/src/classes/EventManager";

import { getAllStuffApi } from "apis/versionControlApis";

import { appOptions } from "classes/AppOptions";
import { persistentStorage } from "classes/PersistentStorage";
import { stuffStore } from "classes/StuffStore";
import { systemController } from "classes/SystemController";

import { printCatchError } from "functions/utilities/otherUtilities";

import { PERSISTENT_STORAGE_KEYS } from "variables/otherVariables/helpers";

const tryToGetAllStuff = async () => {
  const { data } = await getAllStuffApi.sendFullFeaturedRequest({
    language: "en",
  });
  return data;
};

const executeIfNoErrorOnTryToGetAllStuff = (response) => {
  const { errors, models, routes, validationModels, languageData } = response;

  persistentStorage.stringifyAndSetItem(PERSISTENT_STORAGE_KEYS.STUFFS, {
    errors,
    languageData,
    models,
    routes,
    validationModels,
  });

  stuffStore.updateAllStuff({
    errors,
    languageData,
    models,
    routes,
    validationModels,
  });

  const {
    EVENT_EMITTER_EVENTS: { ALL_STUFF_RECEIVED },
  } = appOptions.getOptions();

  eventManager.emitEvent(ALL_STUFF_RECEIVED);
  systemController.changeEventStatusToDone(ALL_STUFF_RECEIVED);
};

const getAllStuff = () => {
  return async () => {
    (await trier(getAllStuff.name).tryAsync(tryToGetAllStuff))
      .executeIfNoError(executeIfNoErrorOnTryToGetAllStuff)
      .catch(printCatchError, getAllStuff.name);
  };
};

const stuffControllers = { getAllStuff };

export { stuffControllers };
