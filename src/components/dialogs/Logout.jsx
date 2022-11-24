import DialogTemplate from "components/dialogs/Template";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomButton from "components/generals/inputs/CustomButton";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";

const LogoutDialog = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatch(controllers.logout());
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
