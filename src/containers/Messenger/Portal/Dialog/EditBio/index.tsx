import { Template } from "~/components";
import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditBio = () => {
  const globalStore = useGlobalStore();
  const settingsStore = useSettingsStore();
  const { handler: profileUpdater, loading } = useUpdateProfile();
  const dialogState = useDialogState("editBio");

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsStore.updateProfile({ [event.target.name]: value });
  };

  const handleSaveClick = async () => {
    profileUpdater(globalStore.closeDialog);
  };

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={dialogState.open}
        content={
          <Content
            bio={settingsStore.profile.bio}
            onChange={handleInputChange}
          />
        }
        actions={
          <Actions
            loading={loading}
            onSaveClick={handleSaveClick}
            onCancel={globalStore.closeDialog}
          />
        }
      />
    </>
  );
};

export default EditBio;
