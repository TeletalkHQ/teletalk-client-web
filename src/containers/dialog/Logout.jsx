import DialogTemplate from "components/dialog/Template";
import CustomBox from "components/general/box/CustomBox";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import CustomButton from "components/general/input/CustomButton";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";
import { useSelector } from "hooks/useThunkReducer";

const LogoutDialog = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();
  const state = useSelector();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatchAsync(controllers.logout());
  };

  const actionContent = (
    <>
      <CustomButton onClick={handleClose} variant="text" color="primary">
        Cancel
      </CustomButton>

      <CustomButton onClick={handleLogout} variant="text" color="error">
        Confirm
      </CustomButton>
    </>
  );

  const mainContent = (
    <>
      <CustomFlexBox jc="center" ai="center">
        <CustomBox>Are you sure to logout?</CustomBox>
      </CustomFlexBox>
    </>
  );

  return (
    <>
      <DialogTemplate
        open={state.global.dialogState.logout.open}
        actionContent={actionContent}
        mainContent={mainContent}
        onClose={handleClose}
      />
    </>
  );
};

export default LogoutDialog;
