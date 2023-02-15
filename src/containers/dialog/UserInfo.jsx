import DialogTemplate from "src/components/dialog/Template";
import UserInfoComponents from "src/components/dialog/userInfo";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

const UserInfo = ({ onDialogClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
