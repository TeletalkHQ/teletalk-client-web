import ContactListItem from "src/components/other/ContactListItem";
import CustomBox from "src/components/general/box/CustomBox";
import CustomButton from "src/components/general/input/CustomButton";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import DialogTemplate from "src/components/dialog/Template";
import H5 from "src/components/general/header/H5";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

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
  const dispatch = useDispatch();
  const state = useSelector();

  const handleAddContactClick = () => {
    dispatch(commonActions.closeDialog(stateStatics.DIALOG_NAMES.CONTACTS));
    dispatch(commonActions.openDialog(stateStatics.DIALOG_NAMES.ADD_CONTACT));
  };

  const handleCloseContactDialog = () => {
    onDialogClose("contacts");
  };

  const handleContactItemClicked = (contact) => {
    handleCloseContactDialog();
    dispatch(actions.selectedUserForPrivateChat({ userId: contact.userId }));
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
