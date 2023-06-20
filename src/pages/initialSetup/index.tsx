import { useEffect } from "react";

import Box from "~/components/general/box";
import FullPageLoading from "~/components/portal/FullPageLoading";
import { controllers } from "~/controllers";

const InitialSetup = () => {
  useEffect(() => {
    startInitialSetup();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startInitialSetup = () => {
    dispatch(controllers.getAllStuff());
  };

  useEffect(() => {
    if (state.other.isStuffImported) {
      dispatch(controllers.initialSetup());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.other.isStuffImported]);

  return (
    <>
      <Box.FullScreen>
        <p>server is not available</p>
        <button onClick={startInitialSetup}>try again</button>
      </Box.FullScreen>
      <FullPageLoading loading={state.global.globalLoading} />
    </>
  );
};

export default InitialSetup;
