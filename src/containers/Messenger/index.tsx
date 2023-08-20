import { extractor } from "~/classes/Extractor";
import { Box } from "~/components";
import RightSide from "~/containers/Messenger/RightSide";
import { useListener, useUnmount } from "~/hooks";
import { useUserStore } from "~/store";
import { resetAllStores } from "~/store/utils";

import LeftSide from "./LeftSide";
import Portal from "./Portal";

const Messenger = () => {
  const userStore = useUserStore();
  useUnmount(resetAllStores);

  useListener({
    evName: "updatePublicUserData",
    cb: (response) => {
      userStore.setCurrentUserData({
        ...extractor.currentUserData({
          ...userStore.currentUserData,
          blacklist: [],
          clients: [],
        }),
        ...extractor.publicUserData(response.data.publicUserData),
      });
    },
  });

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
