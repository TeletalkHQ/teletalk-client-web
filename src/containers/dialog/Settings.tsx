import { userUtils } from "~/classes/UserUtils";
import SettingsComponents from "~/components/dialog/settings";
import { SettingItem } from "~/components/dialog/settings/types";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore, useUserStore } from "~/store";

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
      title={<SettingsComponents.Title />}
      content={
        <SettingsComponents.Content
          fullName={userUtils.concatFirstNameWithLastName(userState)}
          fullNumber={userUtils.concatCountryCodeWithPhoneNumber(userState)}
          username={userState.username}
          onSettingItemClick={handleSettingItemClick}
        />
      }
      actions={<SettingsComponents.Actions onClose={handleCloseDialog} />}
      open={globalState.dialogState.settings.open}
      onClose={handleCloseDialog}
    />
  );
};

export default Settings;
