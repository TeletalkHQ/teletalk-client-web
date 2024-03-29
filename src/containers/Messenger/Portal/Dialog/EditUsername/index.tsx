import { stuffStore } from "~/classes/StuffStore";
import { Template } from "~/components";
import { useDialogState, useUpdateProfile } from "~/hooks";
import { useGlobalStore, useSettingsStore } from "~/store";
import { OnChangeValidatorFn } from "~/types";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";

const EditUsername = () => {
  const globalStore = useGlobalStore();
  const settingsState = useSettingsStore();
  const dialogState = useDialogState("editUsername");
  const { handler: profileUpdater, loading } = useUpdateProfile();

  const handleInputChange: OnChangeValidatorFn = (value, event) => {
    settingsState.updateProfile({
      [event.target.name]: value,
    });
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
            usernameLength={stuffStore.models.username.minLength}
            username={settingsState.profile.username}
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

export default EditUsername;
