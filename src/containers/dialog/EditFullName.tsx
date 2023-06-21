import EditFullNameComponents from "~/components/dialog/editFullName";
import DialogTemplate from "~/components/dialog/template";
import { helpers } from "~/helpers";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";
import { CommonChangeEvent } from "~/types";

const EditFullName = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const userState = useUserStore();

  const handleInputChange = (event: CommonChangeEvent) => {
    settingsState.updateProfile({ [event.target.name]: event.target.value });
  };

  const handleSaveClick = async () => {
    helpers.updateProfile(settingsState, userState, handleBack);
    handleBack();
  };
  const handleClose = () => {
    globalState.closeDialog("editFullName");
  };
  const handleBack = () => {
    handleClose();
    globalState.openDialog("editProfile");
  };

  return (
    <>
      <DialogTemplate
        title={<EditFullNameComponents.Title />}
        open={globalState.dialogState.editFullName.open}
        content={
          <EditFullNameComponents.Content
            fullName={settingsState.profile}
            onChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <EditFullNameComponents.Actions
            onSaveClick={handleSaveClick}
            onCancel={handleBack}
          />
        }
      />
    </>
  );
};

export default EditFullName;
