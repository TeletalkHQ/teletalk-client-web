import { trier } from "simple-trier";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

const getCurrentUserData = () => {
  return async (dispatch) => {
    await trier(getCurrentUserData.name)
      .tryAsync(tryBlock, dispatch)
      .executeIfNoError(executeIfNoError, dispatch)
      .catch(catchBlock, dispatch)
      .finally(() => dispatch(commonActions.closeGlobalLoading()))
      .runAsync();
  };
};

const tryBlock = async (dispatch) => {
  dispatch(commonActions.openGlobalLoading());

  const response = (
    await apiManager.apis.getCurrentUserData.sendRequest()
  ).getResponse();

  if (response.statusText !== "OK") throw response.data;

  return response.data;
};
const executeIfNoError = (data, dispatch) => {
  const { contacts, ...rest } = data.user;
  dispatch(actions.updateAllUserData(rest));
  dispatch(
    actions.addUsers({
      users: fixContacts(contacts),
    })
  );

  dispatch(commonActions.changeViewMode.messenger());
};

const fixContacts = (contacts) =>
  contacts.map((item) => ({
    ...item,
    isContact: true,
  }));

const catchBlock = (_error, dispatch) =>
  dispatch(commonActions.changeViewMode.signIn());

export { getCurrentUserData };
