import { useEffect } from "react";

import Box from "~/components/general/box";
import LeftSide from "~/containers/messenger/leftSide";
import Portal from "~/containers/messenger/portal";
import RightSide from "~/containers/messenger/rightSide";
import { useGlobalStore } from "~/store";

const Messenger = () => {
  const globalStore = useGlobalStore();

  useEffect(() => {
    globalStore.closeFullPageLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <Portal />
      <LeftSide />
      <RightSide />
    </Box.Grid>
  );
};

export default Messenger;
