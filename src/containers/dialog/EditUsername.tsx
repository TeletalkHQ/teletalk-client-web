import { stuffStore } from "~/classes/StuffStore";
import DialogTemplate from "~/components/dialog/Template";
import EditUsernameComponents from "~/components/dialog/editUsername";
import { controllers } from "~/controllers";
import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

const EditUsername = ({ onDialogClose }) => {
  const handleInputChange = (event) => {
    dispatch(
      actions.updateProfile({
        profile: { [event.target.name]: event.target.value },
      })
    );
  };

  const handleSaveClick = async () => {
    dispatch(controllers.updateProfile());
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
