import DialogTemplate from "src/components/dialog/Template";
import LogoutComponents from "src/components/dialog/logout";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useSelector } from "src/hooks/useThunkReducer";

const Logout = ({ onDialogClose }) => {
  const state = useSelector();
  const {
    others: { socket },
  } = useMainContext();

  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatchAsync(controllers.logout());
    socket.emit("logout");
  };

  return (
    <>
      <DialogTemplate
        open={state.global.dialogState.logout.open}
        actions={
          <LogoutComponents.Actions
            onClose={handleClose}
            onLogout={handleLogout}
          />
        }
        content={<LogoutComponents.Content />}
        onClose={handleClose}
      />
    </>
  );
};

export default Logout;
