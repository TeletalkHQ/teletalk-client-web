import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useDialogState, useGetPublicData, useIsOnline } from "~/hooks";
import { useGlobalStore, useMessageStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const UserInfo = () => {
  const globalStore = useGlobalStore();
  const messageStore = useMessageStore();
  const dialogState = useDialogState("userInfo");
  const { isOnline } = useIsOnline(messageStore.selectedChatInfo.userId);
  const { publicData } = useGetPublicData(messageStore.selectedChatInfo.userId);

  const connectionStatus = isOnline ? "online" : "offline";

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={dialogState.open}
        content={
          <Content
            connectionStatus={connectionStatus}
            avatarSrc={publicData.avatarSrc}
            fullName={userUtils.concatFirstNameWithLastName(publicData)}
            fullNumber={userUtils.concatCountryCodeWithPhoneNumber(publicData)}
          />
        }
        actions={<Actions onClose={globalStore.closeDialog} />}
      />
    </>
  );
};

export default UserInfo;
