const { trier } = require("utility-store/src/classes/Trier");

const { apiManager } = require("src/classes/api/ApiManager");
const { actions } = require("src/store/actions");
const { commonActions } = require("src/store/commonActions");

const getUserData = () => {
  const tryToGetUserData = async () => {
    const {
      data: { user },
    } = await apiManager.apis.getUserData.sendFullFeaturedRequest();

    return user;
  };
  const executeIfNoError = (user, dispatch) => {
    delete user.token;
    dispatch(actions.updateAllUserData(user));
    dispatch(commonActions.changeViewMode.messenger());
  };

  const catchTryToGetUserData = (dispatch) =>
    dispatch(commonActions.changeViewMode.signIn());

  return async (dispatch) => {
    await trier(getUserData.name)
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

  return response.data.publicUserInfo;
};

const userControllers = {
  getPublicUserData,
  getUserData,
};

export { userControllers };
