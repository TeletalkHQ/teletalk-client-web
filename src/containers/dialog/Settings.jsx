import lodash from "lodash";

import { userUtilities } from "src/classes/UserUtilities";

import DialogTemplate from "src/components/dialog/Template";
import SettingsComponents from "src/components/dialog/settings";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { commonActions } from "src/store/commonActions";

const Settings = ({ onDialogClose }) => {
  const state = useSelector();
  const dispatch = useDispatch();

  const handleCloseContactDialog = () => {
    onDialogClose("settings");
  };

  const handleSettingItemClick = (item) => {
    const name = lodash.camelCase(item.displayName);
    handleCloseContactDialog();

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
      actions={
        <SettingsComponents.Actions onClose={handleCloseContactDialog} />
      }
      open={state.global.dialogState.settings.open}
      onClose={handleCloseContactDialog}
    />
  );
};

export default Settings;
