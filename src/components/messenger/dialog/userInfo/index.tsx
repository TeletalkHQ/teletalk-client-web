import { userUtils } from "~/classes/UserUtils";
import DialogTemplate from "~/components/messenger/dialog/template";
import Actions from "~/components/messenger/dialog/userInfo/Actions";
import Content from "~/components/messenger/dialog/userInfo/Content";
import Title from "~/components/messenger/dialog/userInfo/Title";
import { useGlobalStore, useUserStore } from "~/store";

const UserInfo = () => {
  const globalState = useGlobalStore();
  const userState = useUserStore();

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
            fullName={userUtils.concatFirstNameWithLastName(userState)}
            fullNumber={userUtils.concatCountryCodeWithPhoneNumber(userState)}
          />
        }
        actions={<Actions onClose={handleClose} />}
        onClose={handleClose}
      />
    </>
  );
};

export default UserInfo;
