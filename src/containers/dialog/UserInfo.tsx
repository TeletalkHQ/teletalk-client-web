import { userUtils } from "~/classes/UserUtils";
import DialogTemplate from "~/components/dialog/template";
import UserInfoComponents from "~/components/dialog/userInfo";
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
        title={<UserInfoComponents.Title />}
        open={globalState.dialogState.userInfo.open}
        content={
          <UserInfoComponents.Content
            fullName={userUtils.concatFirstNameWithLastName(userState)}
            fullNumber={userUtils.concatCountryCodeWithPhoneNumber(userState)}
          />
        }
        actions={<UserInfoComponents.Actions onClose={handleClose} />}
        onClose={handleClose}
      />
    </>
  );
};

export default UserInfo;
