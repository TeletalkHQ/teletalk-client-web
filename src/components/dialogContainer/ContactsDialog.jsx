import { useEffect } from "react";

import { Typography } from "@mui/material";

import { dialogAction } from "actions/globalActions";
import { contactClickAction } from "actions/tempActions";

import { useMyContext } from "hooks/useMyContext";

import DialogTemplate from "components/dialogContainer/DialogTemplate";
import ContactListItem from "components/dialogContainer/ContactListItem";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";

import { getContactsCrl } from "controllers/cellphoneController/getContactsCrl";

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
      <CustomFlexBox jc="space-between" ai="center">
        <CustomBox>
          <Typography>Contacts</Typography>
        </CustomBox>
        <CustomBox></CustomBox>
      </CustomFlexBox>
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
      <CustomFlexBox sx={{ width: "100%" }} jc="space-between" ai="center">
        <CustomBox>
          <CustomButton onClick={handleAddContactClick}>
            Add Contact
          </CustomButton>
        </CustomBox>
        <CustomBox>
          <CustomButton onClick={() => onClose("contacts")}>Close</CustomButton>
        </CustomBox>
      </CustomFlexBox>
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
