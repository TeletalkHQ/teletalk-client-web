import { stuffStore } from "~/classes/StuffStore";
import EditBioComponents from "~/components/dialog/editBio";
import DialogTemplate from "~/components/dialog/template";
import { controllers } from "~/controllers";
import { useGlobalStore, useSettingsStore } from "~/store";
import { CommonChangeEvent, Profile } from "~/types";

const EditBio = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();

  const handleInputChange = (event: CommonChangeEvent) => {
    const key = event.target.name as keyof Profile;

    settingsState.updateProfile({ [key]: event.target.value });
  };

  const handleSaveClick = async () => {
    controllers.updateProfile();
    handleBack();
  };
  const handleClose = () => {
    globalState.closeDialog("editBio");
  };
  const handleBack = () => {
    handleClose();
    globalState.openDialog("editProfile");
  };

  return (
    <>
      <DialogTemplate
        title={<EditBioComponents.Title />}
        open={globalState.dialogState.editBio.open}
        content={
          <EditBioComponents.Content
            bioLength={stuffStore.models.bio.maxLength}
            bio={settingsState.profile.bio}
            onChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <EditBioComponents.Actions
            onSaveClick={handleSaveClick}
            onCancel={handleBack}
          />
        }
      />
    </>
  );
};

export default EditBio;
