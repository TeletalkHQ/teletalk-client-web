import Actions from "~/components/messenger/dialog/editBio/Actions";
import Content from "~/components/messenger/dialog/editBio/Content";
import Title from "~/components/messenger/dialog/editBio/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useUpdateProfile } from "~/hooks/useUpdateProfile";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

const EditBio = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const { updater: profileUpdater, loading } = useUpdateProfile();

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsState.updateProfile({ [event.target.name]: value });
  };

  const handleSaveClick = async () => {
    profileUpdater(handleBack);
  };

  const handleBack = () => {
    handleClose();
    globalState.openDialog("editProfile");
  };

  const handleClose = () => {
    globalState.closeDialog("editBio");
  };

  return (
    <>
      <DialogTemplate
        title={<Title />}
        open={globalState.dialogState.editBio.open}
        content={
          <Content
            bio={settingsState.profile.bio}
            onChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <Actions
            loading={loading}
            onSaveClick={handleSaveClick}
            onCancel={handleBack}
          />
        }
      />
    </>
  );
};

export default EditBio;
