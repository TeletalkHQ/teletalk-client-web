import { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";

import DialogTemplate from "~/Components/DialogContainer/DialogTemplate";
import ContactListItem from "~/Components/DialogContainer/ContactListItem";

import { getContactsCRL } from "~/Controllers/cellphoneController/getContactsCRL";

import { useMyContext } from "~/Hooks/useMyContext";

import { dialogAction } from "~/Actions/GlobalActions/globalActions";
import { tempInitialActions } from "~/Variables/Constants/Initials/InitialActions/tempInitialActions";

const ContactsDialog = ({ onClose }) => {
	const {
		state: {
			global: { dialogState },
			user,
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	useEffect(() => {
		if (dialogState.contacts.open) {
			handleGetContacts();
		}

		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dialogState.contacts.open]);

	const handleAddContactClick = () => {
		dispatch(
			dialogAction({
				dialogState: { ...dialogState, addContact: { ...dialogState.addContact, open: true } },
			}),
		);
	};

	const handleGetContacts = () => {
		dispatch(getContactsCRL());
	};

	//TODO ???
	const handleContactClick = (contact) => {
		dispatch({ type: tempInitialActions.selectedUserChat.type, payload: contact.privateID });
	};

	const handleOnClose = () => {
		onClose("contacts");
	};

	const titleContent = (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Typography>Contacts</Typography>
				</Box>
				<Box></Box>
			</Box>
		</>
	);

	const dialogContent = user.contacts.map((contact, index) => (
		<ContactListItem
			key={index}
			name={`${contact.firstName} ${contact.lastName}`}
			onContactClick={() => handleContactClick(contact)}
		/>
	));

	const actionContent = (
		<>
			<Box
				sx={{ width: "100%" }}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box>
					<Button onClick={handleAddContactClick}>Add Contact</Button>
				</Box>
				<Box>
					<Button onClick={() => onClose("contacts")}>Close</Button>
				</Box>
			</Box>
		</>
	);

	return (
		<DialogTemplate
			titleContent={titleContent}
			actionContent={actionContent}
			dialogContent={dialogContent}
			open={dialogState.contacts.open}
			paperStyle={{ height: "90vh" }}
			onClose={handleOnClose}
		/>
	);
};

export default ContactsDialog;
