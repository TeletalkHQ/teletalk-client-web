import { useMainContext } from "hooks/useMainContext";

import { actions } from "actions/actions";

import ContactListItem from "components/others/ContactListItem";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import DialogTemplate from "components/dialogs/DialogTemplate";
import H5 from "components/generals/headers/H5";

import { commonActions } from "functions/utilities/commonActions";

import { DIALOG_NAMES } from "variables/otherVariables/helpers";

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

const Contacts = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatch },
    state,
  } = useMainContext();

  const handleAddContactClick = () => {
    dispatch(commonActions.closeDialog(DIALOG_NAMES.CONTACTS));
    dispatch(commonActions.openDialog(DIALOG_NAMES.ADD_NEW_CONTACT));
  };

  const handleCloseContactDialog = () => {
    onDialogClose("contacts");
  };

  const handleContactItemClicked = (contact) => {
    handleCloseContactDialog();
    dispatch(
      actions.selectedUserForPrivateChat({
        selectedUserForPrivateChat: contact,
      })
    );
  };
  const mainContent = state.user.contacts?.map((contact, index) => (
    <ContactListItem
      onContactClick={() => handleContactItemClicked(contact)}
      key={index}
      name={`${contact.firstName} ${contact.lastName}`}
    />
  ));

  return (
    <DialogTemplate
      titleContent={<ContactsTitle />}
      mainContent={mainContent}
      actionContent={
        <ContactsActions
          onClose={handleCloseContactDialog}
          onAddContactClick={handleAddContactClick}
        />
      }
      open={state.global.dialogState.contacts.open}
      paperStyle={{ height: "90vh" }}
      onClose={handleCloseContactDialog}
    />
  );
};

export default Contacts;
