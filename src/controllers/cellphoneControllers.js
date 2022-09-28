import { actions } from "actions/actions";

import { apiManager } from "classes/apiClasses/ApiManager";

import { printCatchError } from "functions/utilities/otherUtilities";

const getContacts = () => {
  return async (dispatch) => {
    try {
      const result =
        await apiManager.apis.getContacts.sendFullFeaturedRequest();

      dispatch(
        actions.updateAllUserContacts({
          contacts: result.data.contacts,
        })
      );
    } catch (error) {
      printCatchError(getContacts.name, error);
    }
  };
};

const addNewContact = (contact) => {
  return async (dispatch) => {
    try {
      const result = await apiManager.apis.addContact.sendFullFeaturedRequest(
        contact
      );

      dispatch(
        actions.addNewContact({
          newContact: result.data.addedContact,
        })
      );
    } catch (error) {
      printCatchError(addNewContact.name, error);
    }
  };
};

const cellphoneControllers = { addNewContact, getContacts };

export { cellphoneControllers };
