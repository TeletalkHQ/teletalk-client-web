import lodash from "lodash";

import { userUtilities } from "src/classes/UserUtilities";

import DialogTemplate from "src/components/dialog/Template";
import SettingsComponents from "src/components/dialog/settings";

import { useDispatch, useSelector } from "react-redux";

import { commonActions } from "src/store/commonActions";

const Settings = ({ onDialogClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    onDialogClose("settings");
  };

  const handleSettingItemClick = (item) => {
    const name = lodash.camelCase(item.displayName);
    handleCloseDialog();

    dispatch(commonActions.openDialog(name, { zIndex: 1500 }));
  };

  const fullName = userUtilities.makeFullName(state.user);
  const fullNumber = userUtilities.makeFullNumber(state.user);

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
