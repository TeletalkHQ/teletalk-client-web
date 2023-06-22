import { stuffStore } from "~/classes/StuffStore";
import EditUsernameComponents from "~/components/dialog/editUsername";
import DialogTemplate from "~/components/dialog/template";
import { helpers } from "~/helpers";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";
import { CommonChangeEvent } from "~/types";

const EditUsername = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const userState = useUserStore();

  const handleInputChange = (event: CommonChangeEvent) => {
    settingsState.updateProfile({ [event.target.name]: event.target.value });
  };

  const handleSaveClick = async () => {
    helpers.updateProfile(settingsState, userState, handleBack);
  };
  const handleClose = () => {
    globalState.closeDialog("editUsername");
  };
  const handleBack = () => {
    handleClose();
    globalState.openDialog("editProfile");
  };

  return (
    <>
      <DialogTemplate
        title={<EditUsernameComponents.Title />}
        open={globalState.dialogState.editUsername.open}
        content={
          <EditUsernameComponents.Content
            usernameLength={stuffStore.models.username.minLength}
            username={settingsState.profile.username}
            onChange={handleInputChange}
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
