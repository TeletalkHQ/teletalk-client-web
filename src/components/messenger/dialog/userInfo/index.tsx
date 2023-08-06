import { userUtils } from "~/classes/UserUtils";
import DialogTemplate from "~/components/messenger/dialog/template";
import Actions from "~/components/messenger/dialog/userInfo/Actions";
import Content from "~/components/messenger/dialog/userInfo/Content";
import Title from "~/components/messenger/dialog/userInfo/Title";
import { useUserPublicData } from "~/hooks";
import { useGlobalStore, useMessageStore } from "~/store";

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
      <DialogTemplate
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
