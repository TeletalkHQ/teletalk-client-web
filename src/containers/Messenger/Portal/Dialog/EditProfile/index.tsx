import { useEffect } from "react";
import { extractor } from "utility-store";

import { Template } from "~/components";
import { useDialogState } from "~/hooks/useDialogState";
import { useGlobalStore, useSettingsStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { EditProfileListItem } from "./types";

const EditProfile = () => {
  const globalState = useGlobalStore();
  const settingsStore = useSettingsStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("editProfile");

  useEffect(() => {
    if (dialogState.open)
      settingsStore.updateProfile({
        ...extractor.cellphone(userStore.currentUserData),
        ...extractor.fullName(userStore.currentUserData),
        bio: userStore.currentUserData.bio,
        username: userStore.currentUserData.username,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogState.open, userStore]);

  const handleItemClick = (item: EditProfileListItem) => {
    globalState.openDialog(item.name, {
      zIndex: 1500,
    });
  };

  return (
    <>
      <Template.Dialog
        title={<Title />}
        open={dialogState.open}
        content={
          <Content profile={settingsStore.profile} onClick={handleItemClick} />
        }
        actions={<Actions onCancel={globalState.closeDialog} />}
      />
    </>
  );
};

export default EditProfile;
