import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useUserPublicData } from "~/hooks";
import { useGlobalStore, useMessageStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const UserInfo = () => {
  const globalState = useGlobalStore();
  const messageStore = useMessageStore();
  const { publicData } = useUserPublicData(
    messageStore.selectedChatInfo.userId
  );

  const handleClose = () => {
    globalState.closeDialog("userInfo");
  };

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={globalState.dialogState.userInfo.open}
        content={
          <Content
            fullName={userUtils.concatFirstNameWithLastName(publicData)}
            fullNumber={userUtils.concatCountryCodeWithPhoneNumber(publicData)}
          />
        }
        actions={<Actions onClose={handleClose} />}
        onClose={handleClose}
      />
    </>
  );
};

export default UserInfo;
