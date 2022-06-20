import { useState } from "react";

import { Box, Typography } from "@mui/material";

import DialogTemplate from "components/dialogContainer/DialogTemplate";

import { addNewContactCrl } from "controllers/cellphoneController/addNewContactCrl";

import { useMyContext } from "hooks/useMyContext";

import { initialContact } from "variables/initials/initialValues/initialValues";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";

const AddNewContactDialog = ({ onClose }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { dialogState },
    },
  } = useMyContext();

  const [contact, setContact] = useState(initialContact);

  const handleInputChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleAddNewContact = () => {
    dispatch(
      addNewContactCrl({
        countryCode: "98",
        countryName: "iran",
        phoneNumber: contact.phoneNumber,
        firstName: contact.firstName,
        lastName: contact.lastName,
      })
    );

    handleOnClose();
    setContact(initialContact);
  };

  const handleOnClose = () => {
    onClose("addContact");
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
          <CustomTextInput
            value={contact.firstName}
            label="First name"
            name="firstName"
            onChange={handleInputChange}
          />
        </Box>
        <Box mt={2}>
          <CustomTextInput
            value={contact.lastName}
            label="Last name"
            name="lastName"
            onChange={handleInputChange}
          />
        </Box>
        <Box mt={2}>
          <CustomTextInput
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
          <CustomButton onClick={handleOnClose}>Cancel</CustomButton>
        </Box>
        <Box>
          <CustomButton onClick={handleAddNewContact}>Create</CustomButton>
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
        open={dialogState.addNewContact.open}
        paperStyle={{ height: "50vh" }}
        onClose={handleOnClose}
      />
    </>
  );
};

export default AddNewContactDialog;
