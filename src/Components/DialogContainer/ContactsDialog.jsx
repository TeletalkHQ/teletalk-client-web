import { Box, Button, Typography } from "@mui/material";

import DialogTemplate from "~/Components/DialogContainer/DialogTemplate";
import ChatListItem from "~/Components/ChatContainer/ChatListItem";

import { INITIAL_STATE } from "~/Variables/constants/Initials/initialStates";
import { useEffect } from "react";

const ContactsDialog = ({
	state = INITIAL_STATE,
	onClose,
	onGetContacts,
	onAddContactClick,
}) => {
	const {
		global: { dialogState },
		auth: { userState },
	} = state;

	useEffect(() => {
		onGetContacts();

		return () => {};
	}, []);

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
		<ChatListItem key={index} contact={contact} />
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
					<Button
						onClick={() => {
							onAddContactClick();
						}}
					>
						Add Contact
					</Button>
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
