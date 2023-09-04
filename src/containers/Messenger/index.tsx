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
    cb: (response) =>
      userStore.addContactWithCellphone(response.data.newContact),
  });

  useListener({
    evName: "addContactWithCellphone",
    cb: (response) => userStore.addContactWithUserId(response.data.newContact),
  });

  useListener({
    evName: "updateContact",
    cb: (response) => userStore.updateUser(response.data.updatedContact),
  });

  useListener({
    evName: "removeContact",
    cb: (response) => userStore.removeContact(response.data.removedContact),
  });

  useListener({
    evName: "addBlock",
    cb: (response) => userStore.addBlock(response.data.blockedUser),
  });
  useListener({
    evName: "removeBlock",
    cb: (response) => userStore.removeBlock(response.data.removedBlock),
  });

  useListener({
    evName: "updatePublicData",
    cb: ({ data: { userPublicData } }) =>
      userStore.currentUserData.userId === userPublicData.userId
        ? userStore.updateCurrentUserPublicData(userPublicData)
        : userStore.updateUser({
            bio: userPublicData.bio,
            originalFirstName: userPublicData.firstName,
            originalLastName: userPublicData.lastName,
            userId: userPublicData.userId,
            username: userPublicData.username,
          }),
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
