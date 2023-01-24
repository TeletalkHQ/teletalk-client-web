import DialogTemplate from "src/components/dialog/Template";
import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useSelector } from "src/hooks/useThunkReducer";

const LogoutDialog = ({ onDialogClose }) => {
  const state = useSelector();

  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatchAsync(controllers.logout());
  };

  const actionContent = (
    <>
      <Input.Button onClick={handleClose} variant="text" color="primary">
        Cancel
      </Input.Button>

      <Input.Button onClick={handleLogout} variant="text" color="error">
        Confirm
      </Input.Button>
    </>
  );

  const mainContent = (
    <>
      <Box.Flex jc="center" ai="center">
        <Box.Div>Are you sure to logout?</Box.Div>
      </Box.Flex>
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
