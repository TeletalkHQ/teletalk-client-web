import { trier } from "utility-store/src/classes/Trier";

import { versionControl } from "src/api/versionControl";

import { apiManager } from "src/classes/api/ApiManager";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/ValidatorManager";

const getAllStuff = () => {
  const tryToGetAllStuff = async () => {
    const { data } = await versionControl.getAllStuff.sendFullFeaturedRequest({
      language: "en",
    });
    return data;
  };

  const executeIfNoError = (data) => {
    stuffStore.updateStore(data);

    apiManager.build();

    const { version, ...validationModels } = stuffStore.validationModels;
    validatorManager.compileValidators(validationModels);
  };

  return async () => {
    (await trier(getAllStuff.name).tryAsync(tryToGetAllStuff))
      .executeIfNoError(executeIfNoError)
      .printAndThrow();
  };
};

const stuffControllers = { getAllStuff };

export { stuffControllers };
