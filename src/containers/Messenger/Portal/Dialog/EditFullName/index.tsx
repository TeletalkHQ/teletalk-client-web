import { Template } from "~/components";
import { useUpdateProfile } from "~/hooks";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditFullName = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const dialogState = useDialogState("editFullName");
  const { updater: profileUpdater, loading } = useUpdateProfile();

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsState.updateProfile({
      [event.target.name]: value,
    });
  };

  const handleSaveClick = async () => {
    profileUpdater(globalState.closeDialog);
  };

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={dialogState.open}
        content={
          <Content
            fullName={settingsState.profile}
            onChange={handleInputChange}
          />
        }
        actions={
          <Actions
            loading={loading}
            onSaveClick={handleSaveClick}
            onCancel={globalState.closeDialog}
          />
        }
      />
    </>
  );
};

export default EditFullName;
