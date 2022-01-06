import ContactsDialog from "~/Components/DialogContainer/ContactsDialog";
import AddContactDialog from "~/Components/DialogContainer/AddContactDialog";

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
			<ContactsDialog onClose={handleClose} />

			<AddContactDialog onClose={handleClose} />
		</>
	);
};

export default DialogContainer;
