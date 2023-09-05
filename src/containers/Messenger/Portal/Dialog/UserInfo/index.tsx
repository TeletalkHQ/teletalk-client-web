import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useUserPublicData } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore, useMessageStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const UserInfo = () => {
  const globalState = useGlobalStore();
  const messageStore = useMessageStore();
  const dialogState = useDialogState("userInfo");
  const { publicData } = useUserPublicData(
    messageStore.selectedChatInfo.userId
  );

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={dialogState.open}
        content={
          <Content
            fullName={userUtils.concatFirstNameWithLastName(publicData)}
            fullNumber={userUtils.concatCountryCodeWithPhoneNumber(publicData)}
          />
        }
        actions={<Actions onClose={globalState.closeDialog} />}
      />
    </>
  );
};

export default UserInfo;
