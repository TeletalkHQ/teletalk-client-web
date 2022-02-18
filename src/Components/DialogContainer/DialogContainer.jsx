import AddNewContactDialog from "~/Components/DialogContainer/AddNewContactDialog";
import ContactsDialog from "~/Components/DialogContainer/ContactsDialog";
import LogoutDialog from "~/Components/DialogContainer/LogoutDialog";

import { useMyContext } from "~/Hooks/useMyContext";

import { dialogAction } from "~/Actions/GlobalActions/globalActions";

const DialogContainer = () => {
	const {
		state: {
			global: { dialogState },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleClose = (target) => {
		dispatch(
			dialogAction({
				dialogState: { ...dialogState, [target]: { ...dialogState[target], open: false } },
			}),
		);
	};

	return (
		<>
			<AddNewContactDialog onClose={handleClose} />

			<ContactsDialog onClose={handleClose} />

			<LogoutDialog onClose={handleClose} />
		</>
	);
};

export default DialogContainer;
