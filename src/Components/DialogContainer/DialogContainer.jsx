import ContactsDialog from "~/Components/DialogContainer/ContactsDialog";
import AddContactDialog from "~/Components/DialogContainer/AddContactDialog";

import { useMyContext } from "~/Hooks/useMyContext";

import { globalActions } from "~/Variables/constants/Initials/initialActions";

const { dialogAction } = globalActions;

const DialogContainer = () => {
	const {
		state,
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleClose = (target) => {
		dispatch({
			type: dialogAction.type,
			payload: { [target]: { open: false, dialogName: target } },
		});
	};

	return (
		<>
			<ContactsDialog onClose={handleClose} />

			<AddContactDialog onClose={handleClose} state={state} />
		</>
	);
};

export default DialogContainer;
