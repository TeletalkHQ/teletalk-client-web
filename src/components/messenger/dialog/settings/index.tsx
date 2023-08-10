import { userUtils } from "~/classes/UserUtils";
import Actions from "~/components/messenger/dialog/settings/Actions";
import Content from "~/components/messenger/dialog/settings/Content";
import Title from "~/components/messenger/dialog/settings/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore, useUserStore } from "~/store";

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
    <DialogTemplate
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
