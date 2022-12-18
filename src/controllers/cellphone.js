import { trier } from "utility-store/src/classes/Trier";

import { actions } from "src/store/actions";

import { apiManager } from "src/classes/api/ApiManager";

import { utilities } from "src/utilities";

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
const getContacts = () => {
  return async (dispatch) => {
    (await trier(getContacts.name).tryAsync(tryToGetContacts)).executeIfNoError(
      executeIfNoErrorOnTryToGetContacts,
      dispatch
    );
  };
};

const tryToAddNewContact = async (contact) => {
  return await apiManager.apis.addContact.sendFullFeaturedRequest(contact);
};
const executeIfNoErrorOnTryToAddNewContact = (response, dispatch) => {
  dispatch(
    actions.addNewContact({
      newContact: response.data.addedContact,
    })
  );
};
const addNewContact = (contact) => {
  return async (dispatch) => {
    return (
      await trier(addNewContact.name).tryAsync(tryToAddNewContact, contact)
    )
      .executeIfNoError(executeIfNoErrorOnTryToAddNewContact, dispatch)
      .catch(() => {
        utilities.printCatchError(addNewContact.name);
        return { ok: false };
      })
      .result();
  };
};

const cellphoneControllers = {
  addNewContact,
  getContacts,
};

export { cellphoneControllers };
