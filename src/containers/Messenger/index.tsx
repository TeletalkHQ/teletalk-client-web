import { extractor } from "~/classes/Extractor";
import { websocket } from "~/classes/websocket/Websocket";
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

  websocket.client.onAny((event, data) => {
    console.log("coming event:", event, "data:", data);
  });

  useListener({
    evName: "addContactWithUserId",
    cb: (response) => {
      userStore.updateUser({
        ...response.data.newContact,
        isContact: true,
      });
    },
  });

  useListener({
    evName: "addContactWithCellphone",
    cb(response) {
      userStore.updateUser({
        ...response.data.newContact,
        isContact: true,
      });
    },
  });

  useListener({
    evName: "updateContact",
    cb(response) {
      userStore.updateUser(response.data.updatedContact);
    },
  });

  useListener({
    evName: "removeContact",
    cb(response) {
      userStore.removeContact(response.data.removedContact);
    },
  });

  useListener({
    evName: "addBlock",
    cb(response) {
      userStore.updateUser({
        userId: response.data.blockedUser.userId,
        isBlocked: true,
      });
    },
  });
  useListener({
    evName: "removeBlock",
    cb(response) {
      userStore.updateUser({
        userId: response.data.removedBlock.userId,
        isBlocked: false,
      });
    },
  });

  useListener({
    evName: "updatePublicData",
    cb: (response) => {
      userStore.setCurrentUserData({
        ...extractor.currentUserData({
          ...userStore.currentUserData,
        }),
        ...extractor.publicUserData(response.data.userPublicData),
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
