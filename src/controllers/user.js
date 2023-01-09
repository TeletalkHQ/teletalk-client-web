const { trier } = require("utility-store/src/classes/Trier");

const { apiManager } = require("src/classes/api/ApiManager");

const { actions } = require("src/store/actions");
const { commonActions } = require("src/store/commonActions");

const getCurrentUserData = () => {
  const tryToGetUserData = async () => {
    const { data } =
      await apiManager.apis.getCurrentUserData.sendFullFeaturedRequest();

    return data;
  };
  const executeIfNoError = (data, dispatch) => {
    dispatch(actions.updateAllUserData(data.user));
    dispatch(commonActions.changeViewMode.messenger());
  };

  const catchTryToGetUserData = (dispatch) =>
    dispatch(commonActions.changeViewMode.signIn());

  return async (dispatch) => {
    await trier(getCurrentUserData.name)
      .tryAsync(tryToGetUserData)
      .executeIfNoError(executeIfNoError, dispatch)
      .catch(catchTryToGetUserData, dispatch)
      .runAsync();
  };
};

const getPublicUserData = async (userId) => {
  const response =
    await apiManager.apis.getPublicUserData.sendFullFeaturedRequest({
      userId,
    });

  return response.data.publicUserData;
};

const userControllers = {
  getPublicUserData,
  getCurrentUserData,
};

export { userControllers };
