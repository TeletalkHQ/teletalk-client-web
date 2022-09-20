import { globalActions } from "actions/globalActions";
import { tempActions } from "actions/tempActions";

import { useMainContext } from "hooks/useMainContext";

import DialogTemplate from "components/dialogs/DialogTemplate";
import ContactListItem from "components/dialogs/ContactListItem";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTypography from "components/generals/typographies/CustomTypography";

import { elementNames } from "variables/initials/initialValues/elementNames";

const ContactsDialog = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { dialogState },
      userState,
    },
  } = useMainContext();

  const handleAddContactClick = () => {
    dispatch(
      globalActions.dialogOpenChangeAction({
        dialogName: elementNames.addContacts,
        open: true,
      })
    );
  };

  const handleContactClick = (contact) => {
    dispatch(
      tempActions.selectedContactId({ selectedContactId: contact.privateId })
    );

    handleClose();
  };

  const handleClose = () => {
    onDialogClose("contacts");
  };

  const titleContent = (
    <>
      <CustomFlexBox jc="space-between" ai="center">
        <CustomBox>
          <CustomTypography>Contacts</CustomTypography>
        </CustomBox>
        <CustomBox></CustomBox>
      </CustomFlexBox>
    </>
  );

  // const dialogContent = userState.contacts?.map((contact, index) => (
  //   <ContactListItem
  //     key={index}
  //     name={`${contact.firstName} ${contact.lastName}`}
  //     onContactClick={() => handleContactClick(contact)}
  //   />
  // ));

  const actionContent = (
    <>
      <CustomFlexBox sx={{ width: "100%" }} jc="space-between" ai="center">
        <CustomBox>
          <CustomButton onClick={handleAddContactClick}>
            Add Contact
          </CustomButton>
        </CustomBox>
        <CustomBox>
          <CustomButton onClick={handleClose}>Close</CustomButton>
        </CustomBox>
      </CustomFlexBox>
    </>
  );

  return (
    <DialogTemplate
      titleContent={titleContent}
      actionContent={actionContent}
      // dialogContent={dialogContent}
      open={dialogState.contacts.open}
      paperStyle={{ height: "90vh" }}
      onClose={handleClose}
    />
  );
};

export default ContactsDialog;
