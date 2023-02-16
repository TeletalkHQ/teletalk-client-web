import { trier } from "simple-trier";

import { apiManager } from "src/classes/api/ApiManager";

import { actions } from "src/store/actions";

const getContacts = () => {
  return async (dispatch) => {
    await trier(getContacts.name)
      .tryAsync(tryToGetContacts)
      .executeIfNoError(executeIfNoErrorOnTryToGetContacts, dispatch)
      .runAsync();
  };
};

const tryToGetContacts = async () => {
  return await apiManager.apis.getContacts.sendFullFeaturedRequest();
};

const executeIfNoErrorOnTryToGetContacts = (response, dispatch) => {
  dispatch(
    actions.updateAllUserContacts({
      contacts: response.data.contacts,
    })
  );
};

export { getContacts };
