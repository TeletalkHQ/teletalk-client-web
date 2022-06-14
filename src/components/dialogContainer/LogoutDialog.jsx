import { Box, Button } from "@mui/material";

import DialogTemplate from "components/dialogContainer/DialogTemplate";
import { logoutCrl } from "controllers/authControllers/logoutCrl";

import { useMyContext } from "hooks/useMyContext";

const LogoutDialog = ({ onClose }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { dialogState },
    },
  } = useMyContext();

  const handleClose = () => {
    onClose("logout");
  };

  const handleLogout = () => {
    try {
      dispatch(logoutCrl());

      handleClose();
    } catch (error) {}
  };

  const actionContent = (
    <>
      <Button onClick={handleClose} variant="text" color="primary">
        Cancel
      </Button>

      <Button onClick={handleLogout} variant="text" color="error">
        Confirm
      </Button>
    </>
  );

  const dialogContent = (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>Are you sure to logout?</Box>
      </Box>
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
