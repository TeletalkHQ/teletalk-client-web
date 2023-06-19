import lodash from "lodash";

import { userUtilities } from "~/classes/UserUtilities";
import DialogTemplate from "~/components/dialog/Template";
import SettingsComponents from "~/components/dialog/settings";
import { commonActions } from "~/store/commonActions";

const Settings = ({ onDialogClose }) => {
  const handleCloseDialog = () => {
    onDialogClose("settings");
  };

  const handleSettingItemClick = (item) => {
    const name = lodash.camelCase(item.displayName);
    handleCloseDialog();

    dispatch(commonActions.openDialog(name, { zIndex: 1500 }));
  };

  const fullName = userUtilities.concatFirstNameWithLastName(state.user);
  const fullNumber = userUtilities.concatCountryCodeWithPhoneNumber(state.user);

  return (
    <DialogTemplate
      title={<SettingsComponents.Title />}
      content={
        <SettingsComponents.Content
          fullName={fullName}
          fullNumber={fullNumber}
          username={state.user.username}
          onSettingItemClick={handleSettingItemClick}
        />
      }
      actions={<SettingsComponents.Actions onClose={handleCloseDialog} />}
      open={state.global.dialogState.settings.open}
      onClose={handleCloseDialog}
    />
  );
};

export default Settings;
