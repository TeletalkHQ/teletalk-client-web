import DialogTemplate from "src/components/dialog/Template";
import LogoutComponents from "src/components/dialog/logout";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "react-redux";
import { eventManager } from "src/classes/websocket/EventManager";

const Logout = ({ onDialogClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatch(controllers.logout());
    eventManager.events.logout.emitFull();
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
