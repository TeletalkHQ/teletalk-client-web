import { useEffect } from "react";

import { Box } from "src/components/general/box";
import FullPageLoading from "src/components/portal/FullPageLoading";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";
import { useMainContext } from "src/hooks/useMainContext";

const InitialSetup = () => {
  const dispatch = useDispatch();
  const state = useSelector();

  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  useEffect(() => {
    startSetup();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSetup = () => {
    dispatch(controllers.initialSetup(dispatchAsync));
  };

  return (
    <>
      <Box.Fullscreen>
        <p>server is not available</p>
        <button onClick={startSetup}>try again</button>
      </Box.Fullscreen>
      <FullPageLoading loading={state.global.globalLoading} />
    </>
  );
};

export default InitialSetup;
