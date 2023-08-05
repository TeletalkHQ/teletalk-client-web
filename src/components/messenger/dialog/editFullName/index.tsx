import Actions from "~/components/messenger/dialog/editFullName/Actions";
import Content from "~/components/messenger/dialog/editFullName/Content";
import Title from "~/components/messenger/dialog/editFullName/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

const EditFullName = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const { updater: profileUpdater, loading } = useUpdateProfile();

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsState.updateProfile({ [event.target.name]: value });
  };

  const handleSaveClick = async () => {
    profileUpdater(handleBack);
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
        title={<Title />}
        open={globalState.dialogState.editFullName.open}
        content={
          <Content
            fullName={settingsState.profile}
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

export default EditFullName;
