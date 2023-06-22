import { stuffStore } from "~/classes/StuffStore";
import EditBioComponents from "~/components/dialog/editBio";
import DialogTemplate from "~/components/dialog/template";
import { helpers } from "~/helpers";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";
import { CommonChangeEvent } from "~/types";

const EditBio = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const userState = useUserStore();

  const handleInputChange = (event: CommonChangeEvent) => {
    settingsState.updateProfile({ [event.target.name]: event.target.value });
  };

  const handleSaveClick = async () => {
    helpers.updateProfile(settingsState, userState, handleBack);
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
