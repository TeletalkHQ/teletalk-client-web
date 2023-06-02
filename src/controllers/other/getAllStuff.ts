import { trier } from "simple-trier";

import { api } from "~/api";

import { apiManager } from "~/classes/api/ApiManager";
import { eventManager } from "~/classes/websocket/EventManager";
import { stuffStore } from "~/classes/StuffStore";
import { validatorManager } from "~/classes/validator/ValidatorManager";

import { actions } from "~/store/actions";

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
