import { useEffect } from "react";

import FullPageLoading from "components/portal/FullPageLoading";

import Portal from "containers/portal";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";

import Auth from "containers/auth";
import Messenger from "containers/messenger";

import { stateStatics } from "store/stateStatics";
import { actions } from "store/actions";
import { persistentStorage } from "classes/PersistentStorage";
import { commonActions } from "store/commonActions";

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
  const {
    hooksOutput: { dispatch, dispatchAsync },
    state,
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
