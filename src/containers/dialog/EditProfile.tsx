import { useEffect } from "react";

import { userUtils } from "~/classes/UserUtils";
import EditProfileComponents from "~/components/dialog/editProfile";
import { EditProfileListItemProps } from "~/components/dialog/editProfile/types";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";
import { Profile } from "~/types";

const EditProfile = () => {
  const globalState = useGlobalStore();
  const settingsState = useSettingsStore();
  const userState = useUserStore();

  useEffect(() => {
    if (globalState.dialogState.editProfile.open)
      settingsState.updateProfile({
        ...userUtils.extractCellphone(userState),
        ...userUtils.extractFullName(userState),
        bio: userState.bio,
        username: userState.username,
      } as Profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalState.dialogState.editProfile.open]);

  const handleItemClick = (item: EditProfileListItemProps) => {
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
