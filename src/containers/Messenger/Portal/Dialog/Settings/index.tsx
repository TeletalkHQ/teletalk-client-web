import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useDialogState } from "~/hooks";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { SettingItem } from "./types";

const Settings = () => {
  const globalState = useGlobalStore();
  const userState = useUserStore();
  const dialogState = useDialogState("settings");

  const handleSettingItemClick = (item: SettingItem) => {
    globalState.openDialog(item.name, {
      zIndex: 1500,
    });
  };

  return (
    <Template.Dialog
      title={<Title />}
      content={
        <Content
          fullName={userUtils.concatFirstNameWithLastName(
            userState.currentUserData
          )}
          fullNumber={userUtils.concatCountryCodeWithPhoneNumber(
            userState.currentUserData
          )}
          username={userState.currentUserData.username}
          onSettingItemClick={handleSettingItemClick}
        />
      }
      actions={<Actions onClose={globalState.closeDialog} />}
      open={dialogState.open}
    />
  );
};

export default Settings;
