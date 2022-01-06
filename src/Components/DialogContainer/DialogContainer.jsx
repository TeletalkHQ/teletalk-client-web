import ContactsDialog from "~/Components/DialogContainer/ContactsDialog";
import AddContactDialog from "~/Components/DialogContainer/AddContactDialog";

import { useMyContext } from "~/Hooks/useMyContext";

import { dialogAction } from "~/Actions/GlobalActions/globalActions";

const DialogContainer = () => {
	const {
		state,
		hooksOutput: { dispatch },
	} = useMyContext();

	const handleClose = (target) => {
		dispatch(dialogAction({ [target]: { open: false, dialogName: target } }));
	};

	return (
		<>
			<ContactsDialog onClose={handleClose} />

			<AddContactDialog onClose={handleClose} state={state} />
		</>
	);
};

export default DialogContainer;
