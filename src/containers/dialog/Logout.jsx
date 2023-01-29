import DialogTemplate from "src/components/dialog/Template";
import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useSelector } from "src/hooks/useThunkReducer";

const Logout = ({ onDialogClose }) => {
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

  return (
    <>
      <DialogTemplate
        open={state.global.dialogState.logout.open}
        actions={<Actions onClose={handleClose} onLogout={handleLogout} />}
        content={<Content />}
        onClose={handleClose}
      />
    </>
  );
};

const Content = () => (
  <>
    <Box.Flex jc="center" ai="center">
      <Box.Div>Are you sure to logout?</Box.Div>
    </Box.Flex>
  </>
);

const Actions = ({ onClose, onLogout }) => (
  <>
    <Input.Button onClick={onClose} variant="text" color="primary">
      Cancel
    </Input.Button>

    <Input.Button onClick={onLogout} variant="text" color="error">
      Confirm
    </Input.Button>
  </>
);

export default Logout;
