import { userUtils } from "~/classes/UserUtils";
import { Template } from "~/components";
import { useGlobalStore, useUserStore } from "~/store";

import Actions from "./Actions";
import Content from "./Content";
import Title from "./Title";
import { SettingItem } from "./types";

const Settings = () => {
  const globalState = useGlobalStore();
  const userState = useUserStore();

  const handleCloseDialog = () => {
    globalState.closeDialog("settings");
  };

  const handleSettingItemClick = (item: SettingItem) => {
    handleCloseDialog();

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
      actions={<Actions onClose={handleCloseDialog} />}
      open={globalState.dialogState.settings.open}
      onClose={handleCloseDialog}
    />
  );
};

export default Settings;
