import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { SettingItem } from "./types";

const Settings = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();
  const dialogState = useDialogState("settings");

  const handleSettingItemClick = (item: SettingItem) => {
    globalStore.openDialog(item.name, {
      zIndex: 1500,
    });
  };

  return (
    <Template.Dialog
      title={<Title />}
      content={
        <Content
          avatarSrc={userStore.currentUserData.avatarSrc}
          fullName={userUtils.concatFirstNameWithLastName(
            userStore.currentUserData
          )}
          fullNumber={userUtils.concatCountryCodeWithPhoneNumber(
            userStore.currentUserData
          )}
          username={userStore.currentUserData.username}
          onSettingItemClick={handleSettingItemClick}
        />
      }
      actions={<Actions onClose={globalStore.closeDialog} />}
      open={dialogState.open}
    />
  );
};

export default Settings;
