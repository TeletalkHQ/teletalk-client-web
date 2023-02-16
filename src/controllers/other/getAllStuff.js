import { trier } from "utility-store/src/classes/Trier";

import { api } from "src/api";

import { apiManager } from "src/classes/api/ApiManager";
import { eventManager } from "src/classes/websocket/EventManager";
import { stuffStore } from "src/classes/StuffStore";
import { validatorManager } from "src/classes/validator/ValidatorManager";

import { actions } from "src/store/actions";

const getAllStuff = () => {
  return async (dispatch) => {
    await trier(getAllStuff.name)
      .tryAsync(tryBlock)
      .executeIfNoError(executeIfNoError, dispatch)
      .throw()
      .runAsync();
  };
};

const tryBlock = async () => {
  const { data } = await api.getAllStuff.sendFullFeaturedRequest({
    language: "en",
  });

  return data;
};

const executeIfNoError = (data, dispatch) => {
  stuffStore.updateStore(data);

  apiManager.build();
  eventManager.build();
  validatorManager.compileValidators(stuffStore.validationModels);

  dispatch(actions.isStuffImported({ isStuffImported: true }));
};

export { getAllStuff };
