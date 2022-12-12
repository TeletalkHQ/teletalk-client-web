import { useEffect, useState } from "react";

import { windowUtilities } from "utility-store/src/classes/WindowUtilities";

import InitialSetup from "src/containers/InitialSetup";
import View from "src/containers/view";
import Portal from "src/containers/portal";

import FullPageLoading from "src/components/portal/FullPageLoading";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { stateStatics } from "src/store/stateStatics";
import { commonActions } from "src/store/commonActions";

const Provider = () => {
  const state = useSelector();
  const dispatch = useDispatch();

  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const updater = () => {
      setForceUpdate(!forceUpdate);
    };
    windowUtilities.addProperty("updater", updater);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceUpdate]);

  useEffect(() => {
    windowUtilities.addProperty("state", state);
  }, [state]);

  const handleGlobalLoadingClose = () => {
    dispatch(commonActions.closeGlobalLoading());
  };

  return (
    <>
      {state.global.initialSetupDetails.status !==
      stateStatics.INITIAL_SETUP_STATUS.DONE ? (
        <InitialSetup />
      ) : (
        <>
          <View onGlobalLoadingClose={handleGlobalLoadingClose} />
          <Portal onGlobalLoadingClose={handleGlobalLoadingClose} />
        </>
      )}

      <FullPageLoading globalLoading={state.global.globalLoading} />
    </>
  );
};

export default Provider;
