import { useEffect } from "react";
import { extractor } from "utility-store";
import { Cellphone } from "utility-store/lib/types";

import EditProfileComponents from "~/components/dialog/editProfile";
import { EditProfileListItem } from "~/components/dialog/editProfile/types";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";

const EditProfile = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const userState = useUserStore();

  useEffect(() => {
    if (globalState.dialogState.editProfile.open)
      settingsState.updateProfile({
        ...(extractor.cellphone(userState) as Cellphone),
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
        title={<EditProfileComponents.Title />}
        open={globalState.dialogState.editProfile.open}
        content={
          <EditProfileComponents.Content
            profile={settingsState.profile}
            onClick={handleItemClick}
          />
        }
        actions={<EditProfileComponents.Actions onCancel={handleCancel} />}
        onClose={handleClose}
      />
    </>
  );
};

export default EditProfile;
