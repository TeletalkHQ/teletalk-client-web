import { useEffect } from "react";
import { extractor } from "utility-store";

import { Template } from "~/components";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { EditProfileListItem } from "./types";

const EditProfile = () => {
  const globalState = useGlobalStore();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (globalState.dialogState.editProfile.open)
      settingsStore.updateProfile({
        ...extractor.cellphone(userStore.currentUserData),
        ...extractor.fullName(userStore.currentUserData),
        bio: userStore.currentUserData.bio,
        username: userStore.currentUserData.username,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.dialogState.editProfile.open, userStore]);

  const handleItemClick = (item: EditProfileListItem) => {
    handleClose();
    globalState.openDialog(item.name, { zIndex: 1500 });
  };

  const handleCancel = () => {
    handleClose();
    globalState.openDialog("settings");
  };

  const handleClose = () => {
    globalState.closeDialog("editProfile");
  };

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={globalState.dialogState.editProfile.open}
        content={
          <Content profile={settingsStore.profile} onClick={handleItemClick} />
        }
        actions={<Actions onCancel={handleCancel} />}
        onClose={handleClose}
      />
    </>
  );
};

export default EditProfile;
