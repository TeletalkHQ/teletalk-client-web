import { extractor } from "~/classes/Extractor";
import Box from "~/components/general/box";
import LeftSide from "~/containers/messenger/leftSide";
import Portal from "~/containers/messenger/portal";
import RightSide from "~/containers/messenger/rightSide";
import { useListener, useUnmount } from "~/hooks";
import { useUserStore } from "~/store";
import { resetAllStores } from "~/store/utils";

const Messenger = () => {
  const userStore = useUserStore();
  useUnmount(resetAllStores);

  useListener({
    evName: "updatePublicUserData",
    cb: (response) => {
      userStore.setUserData({
        ...extractor.userState({ ...userStore, blacklist: [], clients: [] }),
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
