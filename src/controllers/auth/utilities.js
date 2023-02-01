import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const update = (data, dispatch) => {
  dispatch(actions.updateAllUserData(data.user));
  dispatch(commonActions.changeViewMode.messenger());
};

const authUtilities = { update };

export { authUtilities };
