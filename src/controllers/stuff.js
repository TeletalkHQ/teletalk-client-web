import { trier } from "utility-store/src/classes/Trier";

import { getAllStuffApi } from "apis/versionControlApis";

import { jobsHandler } from "classes/JobsHandler";
import { stuffStore } from "classes/StuffStore";

import { printCatchError } from "functions/utilities/otherUtilities";

const tryToGetAllStuff = async () => {
  const { data } = await getAllStuffApi.sendFullFeaturedRequest({
    language: "en",
  });
  return data;
};

const executeIfNoErrorOnTryToGetAllStuff = (response) => {
  const { errors, models, routes, validationModels, languageData } = response;

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
