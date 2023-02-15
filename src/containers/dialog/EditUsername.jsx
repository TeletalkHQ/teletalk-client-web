import { stuffStore } from "src/classes/StuffStore";

import DialogTemplate from "src/components/dialog/Template";
import EditUsernameComponents from "src/components/dialog/editUsername";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const EditUsername = ({ onDialogClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(
      actions.updateProfile({
        profile: { [event.target.name]: event.target.value },
      })
    );
  };

  const handleSaveClick = async () => {
    await dispatch(controllers.updateProfile());
    handleBack();
  };
  const handleClose = () => {
    onDialogClose("editUsername");
  };
  const handleBack = () => {
    handleClose();
    dispatch(commonActions.openDialog("editProfile"));
  };

  return (
    <>
      <DialogTemplate
        title={<EditUsernameComponents.Title />}
        open={state.global.dialogState.editUsername.open}
        content={
          <EditUsernameComponents.Content
            usernameModelLength={stuffStore.models.username.minlength.value}
            username={state.settings.profile.username}
            onInputChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <EditUsernameComponents.Actions
            onSaveClick={handleSaveClick}
            onCancel={handleBack}
          />
        }
      />
    </>
  );
};

export default EditUsername;
