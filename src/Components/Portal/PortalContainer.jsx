import Portal from "~/Components/Portal/Portal";

import AppDrawer from "~/Components/Portal/AppDrawer";
import MyBackdrop from "~/Components/Portal/MyBackdrop";

import { useMyContext } from "~/Hooks/useMyContext";

const PortalContainer = ({ onBackdropClose }) => {
	const {
		state: {
			global: { backdropState },
		},
	} = useMyContext();

	return (
		<Portal>
			<MyBackdrop onBackdropClose={onBackdropClose} backdropState={backdropState} />
			<AppDrawer />
		</Portal>
	);
};

export default PortalContainer;
