import ContactListItem from "src/components/other/ContactListItem";
import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";
import H5 from "src/components/general/typography/header/H5";
import DialogTemplate from "src/components/dialog/Template";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

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

  return (
    <DialogTemplate
      title={<Title />}
      content={
        <Content
          contacts={state.user.contacts}
          onContactItemClicked={handleContactItemClicked}
        />
      }
      actions={
        <Actions
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

const Title = () => (
  <>
    <Box.Flex jc="center" ai="center">
      <H5>Contacts</H5>
    </Box.Flex>
  </>
);

const Content = ({ contacts, onContactItemClicked }) =>
  contacts?.map((contact, index) => (
    <ContactListItem
      onContactClick={() => onContactItemClicked(contact)}
      key={index}
      name={`${contact.firstName} ${contact.lastName}`}
    />
  ));

const Actions = ({ onClose, onAddContactClick }) => (
  <>
    <Box.Flex sx={{ width: "100%" }} jc="space-between" gap={2} ai="center">
      <Box.Div>
        <Input.Button
          variant="text"
          style={{ fontWeight: "bold" }}
          onClick={onAddContactClick}
        >
          Add Contact
        </Input.Button>
      </Box.Div>
      <Box.Div>
        <Input.Button
          variant="text"
          style={{ fontWeight: "bold" }}
          onClick={onClose}
        >
          Close
        </Input.Button>
      </Box.Div>
    </Box.Flex>
  </>
);

export default Contacts;
