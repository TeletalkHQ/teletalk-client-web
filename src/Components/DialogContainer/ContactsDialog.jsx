import { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";

import DialogTemplate from "~/Components/DialogContainer/DialogTemplate";
import ContactListItem from "~/Components/DialogContainer/ContactListItem";

import { getContactsCrl } from "~/Controllers/cellphoneController/getContactsCrl";

import { useMyContext } from "~/Hooks/useMyContext";

import { dialogAction } from "~/Actions/GlobalActions/globalActions";
import { contactClickAction } from "~/Actions/TempActions/tempActions";

const ContactsDialog = ({ onClose }) => {
  const {
    state: {
      globalState: { dialogState },
      userState,
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
        dialogState: {
          ...dialogState,
          addContact: { ...dialogState.addContact, open: true },
        },
      })
    );
  };

  const handleGetContacts = () => {
    dispatch(getContactsCrl());
  };

  //TODO ???
  const handleContactClick = (contact) => {
    dispatch(contactClickAction({ selectedContact: contact }));

    handleClose();
  };

  const handleClose = () => {
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

  const dialogContent = userState.contacts?.map((contact, index) => (
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
      onClose={handleClose}
    />
  );
};

export default ContactsDialog;
