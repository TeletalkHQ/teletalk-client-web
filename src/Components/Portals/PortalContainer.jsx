import { Backdrop, CircularProgress } from "@mui/material";

import Portal from "~/Components/Portals/Portal";

import { INITIAL_STATE } from "~/Variables/constants/Initials/initialStates";
import AppDrawer from "~/Components/MainContainer/AppDrawer";

const PortalContainer = ({ state = INITIAL_STATE, onBackdropClose }) => {
	const {
		global: { backdropState },
	} = state;

	return (
		<Portal>
			<Backdrop
				sx={{ color: backdropState.color, zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={backdropState.open}
				onClick={onBackdropClose}
			>
				<CircularProgress color={backdropState.progressColor} />
			</Backdrop>
			<AppDrawer />
		</Portal>
	);
};

export default PortalContainer;
