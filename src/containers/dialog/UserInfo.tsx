import DialogTemplate from "~/components/dialog/Template";
import UserInfoComponents from "~/components/dialog/userInfo";
import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";
import { stateStatics } from "~/store/stateStatics";

const UserInfo = ({ onDialogClose }) => {
  const handleItemClick = (item) => {
    handleClose();
    dispatch(commonActions.openDialog(item.name, { zIndex: 1500 }));
  };

  const handleInputChange = (event) => {
    dispatch(
      actions.updateProfile({
        profile: { [event.target.name]: event.target.value },
      })
    );
  };

  const handleClose = () => {
    onDialogClose(stateStatics.DIALOG_NAMES.USER_INFO);
  };

  return (
    <>
      <DialogTemplate
        title={<UserInfoComponents.Title />}
        open={state.global.dialogState.userInfo.open}
        content={
          <UserInfoComponents.Content
            profile={state.settings.profile}
            onInputChange={handleInputChange}
            onItemClick={handleItemClick}
          />
        }
        actions={<UserInfoComponents.Actions />}
        onClose={handleClose}
      />
    </>
  );
};

export default UserInfo;
