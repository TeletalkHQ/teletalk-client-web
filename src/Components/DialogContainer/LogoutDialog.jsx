import { Box, Button } from "@mui/material";

import DialogTemplate from "~/Components/DialogContainer/DialogTemplate";
import { logoutCRL } from "~/Controllers/AuthControllers/logoutCRL";

import { useMyContext } from "~/Hooks/useMyContext";

const LogoutDialog = ({ onClose }) => {
	const {
		hooksOutput: { dispatch },
		state: {
			global: { dialogState },
		},
	} = useMyContext();

	const handleClose = () => {
		onClose("logout");
	};

	const handleLogout = () => {
		try {
			dispatch(logoutCRL());

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
			<Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
