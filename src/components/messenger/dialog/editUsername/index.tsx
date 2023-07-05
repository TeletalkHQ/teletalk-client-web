import { stuffStore } from "~/classes/StuffStore";
import Actions from "~/components/messenger/dialog/editUsername/Actions";
import Content from "~/components/messenger/dialog/editUsername/Content";
import Title from "~/components/messenger/dialog/editUsername/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useUpdateProfile } from "~/hooks/useUpdateProfile";
import { useGlobalStore, useSettingsStore } from "~/store";
import { CommonChangeEvent } from "~/types";

const EditUsername = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const { updater: profileUpdater } = useUpdateProfile();

  const handleInputChange = (event: CommonChangeEvent) => {
    settingsState.updateProfile({ [event.target.name]: event.target.value });
  };

  const handleSaveClick = async () => {
    profileUpdater(handleBack);
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
        title={<Title />}
        open={globalState.dialogState.editUsername.open}
        content={
          <Content
            usernameLength={stuffStore.models.username.minLength}
            username={settingsState.profile.username}
            onChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <Actions onSaveClick={handleSaveClick} onCancel={handleBack} />
        }
      />
    </>
  );
};

export default EditUsername;
