import ContactsDialog from "~/Components/DialogContainer/ContactsDialog";
import AddContactDialog from "~/Components/DialogContainer/AddContactDialog";

import { getContactsCRL } from "~/Controllers/cellphoneController/getContactsCRL";

import { useMyContext } from "~/Hooks/useMyContext";

import { globalActions } from "~/Variables/constants/initialActions";

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

	const handleAddContactClick = () => {
		dispatch({
			type: dialogAction.type,
			payload: { addContact: { open: true, dialogName: "addContact" } },
		});
	};

	const handleGetContacts = () => {
		dispatch(getContactsCRL());
	};

	return (
		<>
			<ContactsDialog
				state={state}
				onClose={handleClose}
				onAddContactClick={handleAddContactClick}
				onGetContacts={handleGetContacts}
			/>

			<AddContactDialog onClose={handleClose} state={state} />
		</>
	);
};

export default DialogContainer;
