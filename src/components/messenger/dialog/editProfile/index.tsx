import { useEffect } from "react";
import { extractor } from "utility-store";

import Actions from "~/components/messenger/dialog/editProfile/Actions";
import Content from "~/components/messenger/dialog/editProfile/Content";
import Title from "~/components/messenger/dialog/editProfile/Title";
import { EditProfileListItem } from "~/components/messenger/dialog/editProfile/types";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";

const EditProfile = () => {
  const globalState = useGlobalStore();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (globalState.dialogState.editProfile.open)
      settingsStore.updateProfile({
        ...extractor.cellphone(userStore),
        ...extractor.fullName(userStore),
        bio: userStore.bio,
        username: userStore.username,
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
      <DialogTemplate
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
