import DialogTemplate from "components/dialogs/DialogTemplate";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomButton from "components/generals/inputs/CustomButton";

import { logoutController } from "controllers/authControllers/logoutController";

import { printCatchError } from "functions/utilities/otherUtilities";

import { useMainContext } from "hooks/useMainContext";

const LogoutDialog = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { dialogState },
    },
  } = useMainContext();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    try {
      dispatch(logoutController());

      handleClose();
    } catch (error) {
      printCatchError(handleLogout.name, error);
    }
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

  const dialogContent = (
    <>
      <CustomFlexBox jc="center" ai="center">
        <CustomBox>Are you sure to logout?</CustomBox>
      </CustomFlexBox>
    </>
  );

  return (
    <>
      <DialogTemplate
        open={dialogState.logout.open}
        actionContent={actionContent}
        dialogContent={dialogContent}
        onClose={handleClose}
      />
    </>
  );
};

export default LogoutDialog;
