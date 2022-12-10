import { useEffect } from "react";

import { persistentStorage } from "src/classes/PersistentStorage";

import Auth from "src/containers/auth";
import Messenger from "src/containers/messenger";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useDispatch, useSelector } from "src/hooks/useThunkReducer";
import { actions } from "src/store/actions";

import { stateStatics } from "src/store/stateStatics";

const visibleComponent = (viewMode) => {
  const { MESSENGER, NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN } =
    stateStatics.VIEW_MODES;

  const authenticationViewModes = [NEW_USER_PROFILE, SIGN_IN, VERIFY_SIGN_IN];

  if (authenticationViewModes.includes(viewMode)) return Auth;
  if (viewMode === MESSENGER) return Messenger;

  return <div>hi</div>;
};

const View = () => {
  const state = useSelector();
  const dispatch = useDispatch();

  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  const handleGetRequirements = async () => {
    await dispatchAsync(controllers.getCountries());

    const TOKEN = persistentStorage.getItem(
      persistentStorage.STORAGE_KEYS.TOKEN
    );
    if (TOKEN) await dispatchAsync(controllers.getUserData());

    dispatch(actions.globalLoadingOpenChange({ open: false }));
  };

  useEffect(() => {
    handleGetRequirements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = visibleComponent(state.global.viewMode);

  return (
    <>
      <Component />
    </>
  );
};

export default View;
