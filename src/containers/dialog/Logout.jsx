import DialogTemplate from "src/components/dialog/Template";
import CustomBox from "src/components/general/box/CustomBox";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import CustomButton from "src/components/general/input/CustomButton";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useSelector } from "src/hooks/useThunkReducer";

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
