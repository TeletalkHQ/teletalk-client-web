import { trier } from "utility-store/src/classes/Trier";

import { actions } from "actions/actions";

import { apiManager } from "classes/api/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

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
    (await trier(getContacts.name).tryAsync(tryToGetContacts))
      .executeIfNoError(executeIfNoErrorOnTryToGetContacts, dispatch)
      .catch(printCatchError, getContacts.name);
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
    (await trier(addNewContact.name).tryAsync(tryToAddNewContact, contact))
      .executeIfNoError(executeIfNoErrorOnTryToAddNewContact, dispatch)
      .catch(printCatchError, addNewContact.name);
  };
};

const cellphoneControllers = {
  addNewContact,
  getContacts,
};

export { cellphoneControllers };
