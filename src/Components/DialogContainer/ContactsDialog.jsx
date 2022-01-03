import { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";

import DialogTemplate from "~/Components/DialogContainer/DialogTemplate";
import ContactListItem from "~/Components/DialogContainer/ContactListItem";

import { getContactsCRL } from "~/Controllers/cellphoneController/getContactsCRL";

import { useMyContext } from "~/Hooks/useMyContext";

import { authActions, globalActions } from "~/Variables/constants/initialActions";

const { dialogAction } = globalActions;
const { userAction } = authActions;

const ContactsDialog = ({ onClose }) => {
	const {
		state: {
			global: { dialogState },
			auth: { userState },
		},
		hooksOutput: { dispatch },
	} = useMyContext();

	useEffect(() => {
		handleGetContacts();

		return () => {};
	}, []);

	const handleAddContactClick = () => {
		dispatch({
			type: dialogAction.type,
			payload: { addContact: { open: true, dialogName: "addContact" } },
		});
	};

	const handleGetContacts = () => {
		dispatch(getContactsCRL());
	};

	const handleContactClick = (contact) => {
		dispatch({ type: userAction.type, payload: { selectedUserID: contact.privateID } });
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

	const dialogContent = userState.contacts.map((contact, index) => (
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
			target={dialogState.contacts}
			paperStyle={{ height: "90vh" }}
			onClose={onClose}
		/>
	);
};

export default ContactsDialog;
