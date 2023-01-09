import { trier } from "utility-store/src/classes/Trier";

import { api } from "src/api";

import { apiManager } from "src/classes/api/ApiManager";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/validator/ValidatorManager";

const getAllStuff = () => {
  const tryToGetAllStuff = async () => {
    const { data } = await api.getAllStuff.sendFullFeaturedRequest({
      language: "en",
    });
    return data;
  };

  const executeIfNoError = (data) => {
    stuffStore.updateStore(data);

    apiManager.build();
    validatorManager.compileValidators(stuffStore.validationModels);
  };

  return async () => {
    await trier(getAllStuff.name)
      .tryAsync(tryToGetAllStuff)
      .executeIfNoError(executeIfNoError)
      .throw()
      .runAsync();
  };
};

const stuffControllers = { getAllStuff };

export { stuffControllers };
