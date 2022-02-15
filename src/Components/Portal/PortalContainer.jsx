import Portal from "~/Components/Portal/Portal";

import AppDrawer from "~/Components/Portal/AppDrawer";
import MyBackdrop from "~/Components/Portal/MyBackdrop";

import { useMyContext } from "~/Hooks/useMyContext";
import DialogContainer from "~/Components/DialogContainer/DialogContainer";

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
			<DialogContainer />
		</Portal>
	);
};

export default PortalContainer;
