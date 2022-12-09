import { useEffect } from "react";

import { persistentStorage } from "src/classes/PersistentStorage";

import FullPageLoading from "src/components/portal/FullPageLoading";

import Portal from "src/containers/portal";
import Auth from "src/containers/auth";
import Messenger from "src/containers/messenger";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { stateStatics } from "src/store/stateStatics";
import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const visibleComponent = (viewMode) => {
  const {
    FULL_PAGE_LOADING,
    MESSENGER,
    NEW_USER_PROFILE,
    SIGN_IN,
    VERIFY_SIGN_IN,
  } = stateStatics.VIEW_MODES;

  const authenticationViewModes = [NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN];

  if (viewMode === FULL_PAGE_LOADING) return FullPageLoading;
  if (authenticationViewModes.includes(viewMode)) return Auth;
  if (viewMode === MESSENGER) return Messenger;
};

const Root = () => {
  const dispatch = useDispatch();
  const state = useSelector();

  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  useEffect(() => {
    const fn = async () => {
      //TODO: Add to commonActions
      dispatch(actions.globalLoadingOpenChange({ open: true }));
      await dispatchAsync(controllers.getCountries());

      const TOKEN = persistentStorage.getItem(
        persistentStorage.STORAGE_KEYS.TOKEN
      );
      if (TOKEN) {
        await dispatchAsync(controllers.getUserData());
      } else {
        dispatch(commonActions.changeViewMode.signIn());
      }

      dispatch(actions.globalLoadingOpenChange({ open: false }));
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = visibleComponent(state.global.viewMode);

  return (
    <>
      <Component fullPageLoading={state.global.fullPageLoading} />
      <Portal />
    </>
  );
};

export default Root;
