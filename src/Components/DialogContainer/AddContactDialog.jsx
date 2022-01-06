import { useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import DialogTemplate from "~/Components/DialogContainer/DialogTemplate";

import { addNewContactCRL } from "~/Controllers/cellphoneController/addNewContactCRL";

import { useMyContext } from "~/Hooks/useMyContext";

const AddContactDialog = ({ onClose }) => {
	const {
		hooksOutput: { dispatch },
		state: {
			global: { dialogState },
		},
	} = useMyContext();

	const [contact, setContact] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
	});

	const handleInputChange = (event) => {
		setContact({ ...contact, [event.target.name]: event.target.value });
	};

	const handleAddNewContact = () => {
		dispatch(
			addNewContactCRL({
				cellphone: {
					countryCode: "98",
					countryName: "iran",
					phoneNumber: contact.phoneNumber,
				},
				firstName: contact.firstName,
				lastName: contact.lastName,
			}),
		);
	};

	const titleContent = (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Box>
					<Typography>New Contact</Typography>
				</Box>
				<Box></Box>
			</Box>
		</>
	);

	const dialogContent = (
		<>
			<Box>
				<Box mt={2}>
					<TextField
						fullWidth
						value={contact.firstName}
						label="First name"
						name="firstName"
						onChange={handleInputChange}
					/>
				</Box>
				<Box mt={2}>
					<TextField
						fullWidth
						value={contact.lastName}
						label="Last name"
						name="lastName"
						onChange={handleInputChange}
					/>
				</Box>
				<Box mt={2}>
					<TextField
						fullWidth
						value={contact.phoneNumber}
						label="Phone number"
						name="phoneNumber"
						onChange={handleInputChange}
					/>
				</Box>
			</Box>
		</>
	);

	const actionContent = (
		<>
			<Box display="flex" justifyContent="flex-end" alignItems="center">
				<Box>
					<Button>Cancel</Button>
				</Box>{" "}
				<Box>
					<Button onClick={handleAddNewContact}>Create</Button>
				</Box>
			</Box>
		</>
	);

	return (
		<>
			<DialogTemplate
				titleContent={titleContent}
				actionContent={actionContent}
				dialogContent={dialogContent}
				target={dialogState.addContact}
				paperStyle={{ height: "50vh" }}
				onClose={onClose}
			/>
		</>
	);
};

export default AddContactDialog;
