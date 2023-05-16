import { trier } from "simple-trier";

import { actions } from "src/store/actions";

import { apiManager } from "src/classes/api/ApiManager";

import { utilities } from "src/utilities";

const addContact = (contact) => {
  return async (dispatch) => {
    return await trier(addContact.name)
      .tryAsync(tryToAddContact, contact)
      .executeIfNoError(executeIfNoErrorOnTryToAddNewContact, dispatch)
      .catch(() => {
        utilities.printCatchError(addContact.name);
        return { ok: false };
      })
      .runAsync();
  };
};

const tryToAddContact = async (contact) => {
  return await apiManager.apis.addContact.sendFullFeaturedRequest(contact);
};
const executeIfNoErrorOnTryToAddNewContact = (response, dispatch) => {
  dispatch(
    actions.addContact({
      newContact: response.data.addedContact,
    })
  );
};

export { addContact };
