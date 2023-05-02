import { apiManager } from "src/classes/api/ApiManager";

import { actions } from "src/store/actions";

const updateProfile = () => {
  return async (dispatch, getState) => {
    const state = getState();

    const { countryCode, countryName, phoneNumber, ...profile } =
      state.settings.profile;

    const {
      data: { publicUserData },
    } = await apiManager.apis.updatePublicUserData.sendFullFeaturedRequest(
      profile
    );

    dispatch(actions.updateAllUserData({ ...state.user, ...publicUserData }));
  };
};

export { updateProfile };
