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
  const settingsState = useSettingsStore();
  const userState = useUserStore();

  useEffect(() => {
    if (globalState.dialogState.editProfile.open)
      settingsState.updateProfile({
        ...extractor.cellphone(userState),
        ...extractor.fullName(userState),
        bio: userState.bio,
        username: userState.username,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.dialogState.editProfile.open]);

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
          <Content profile={settingsState.profile} onClick={handleItemClick} />
        }
        actions={<Actions onCancel={handleCancel} />}
        onClose={handleClose}
      />
    </>
  );
};

export default EditProfile;
