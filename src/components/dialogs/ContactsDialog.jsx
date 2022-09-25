import { globalActions } from "actions/globalActions";

import { useMainContext } from "hooks/useMainContext";

import DialogTemplate from "components/dialogs/DialogTemplate";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";

import { elementNames } from "variables/initials/initialValues/elementNames";
import ContactListItem from "components/dialogs/ContactListItem";
import H5 from "components/generals/typographies/H5";

const ContactsTitle = () => (
  <>
    <CustomFlexBox jc="center" ai="center">
      <H5>Contacts</H5>
    </CustomFlexBox>
  </>
);

const ContactsActions = ({ onClose, onAddContactClick }) => (
  <>
    <CustomFlexBox
      sx={{ width: "100%" }}
      jc="space-between"
      gap={2}
      ai="center"
    >
      <CustomBox>
        <CustomButton
          variant="text"
          style={{ fontWeight: "bold" }}
          onClick={onAddContactClick}
        >
          Add Contact
        </CustomButton>
      </CustomBox>
      <CustomBox>
        <CustomButton
          variant="text"
          style={{ fontWeight: "bold" }}
          onClick={onClose}
        >
          Close
        </CustomButton>
      </CustomBox>
    </CustomFlexBox>
  </>
);
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

  const handleClose = () => {
    onDialogClose("contacts");
  };

  const dialogContent = userState.contacts?.map((contact, index) => (
    <ContactListItem
      key={index}
      name={`${contact.firstName} ${contact.lastName}`}
    />
  ));

  return (
    <DialogTemplate
      titleContent={<ContactsTitle />}
      actionContent={
        <ContactsActions
          onClose={handleClose}
          onAddContactClick={handleAddContactClick}
        />
      }
      dialogContent={dialogContent}
      open={dialogState.contacts.open}
      paperStyle={{ height: "90vh" }}
      onClose={handleClose}
    />
  );
};

export default ContactsDialog;
