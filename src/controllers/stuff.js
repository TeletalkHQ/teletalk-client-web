import { trier } from "utility-store/src/classes/Trier";

import { getAllStuffApi } from "apis/versionControlApis";

import { jobsHandler } from "classes/JobsHandler";
import { persistentStorage } from "classes/PersistentStorage";
import { stuffStore } from "classes/StuffStore";

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

  persistentStorage.setItem(PERSISTENT_STORAGE_KEYS.STUFFS, {
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

  jobsHandler.emitAllStuffReceived();
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
