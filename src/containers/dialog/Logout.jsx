import DialogTemplate from "src/components/dialog/Template";
import LogoutComponents from "src/components/dialog/logout";

import { websocket } from "src/classes/Websocket";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "react-redux";

const Logout = ({ onDialogClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    onDialogClose("logout");
  };

  const handleLogout = () => {
    dispatch(controllers.logout());
    websocket.client.emit("logout");
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
