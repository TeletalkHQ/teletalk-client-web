import { Template } from "~/components";
import { useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

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
      <Template.Dialog
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
