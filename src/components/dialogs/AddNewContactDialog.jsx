import { useState } from "react";

import { useMainContext } from "hooks/useMainContext";

import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomTypography from "components/generals/typographies/CustomTypography";
import DialogTemplate from "components/dialogs/DialogTemplate";

import { addNewContactController } from "controllers/cellphoneControllers/addNewContactController";

import { elementNames } from "variables/initials/initialValues/elementNames";
import { initialContact } from "variables/initials/initialValues/initialValues";

const AddContactDialogTitle = () => {
  return (
    <>
      <CustomFlexBox jc="space-between" ai="center">
        <CustomBox>
          <CustomTypography>New Contact</CustomTypography>
        </CustomBox>
        <CustomBox></CustomBox>
      </CustomFlexBox>
    </>
  );
};

const AddContactDialogActions = ({
  onAddNewContactClick,
  onContactDialogClose,
}) => {
  return (
    <>
      <CustomFlexBox jc="flex-end" ai="center">
        <CustomBox>
          <CustomButton onClick={onContactDialogClose}>Cancel</CustomButton>
        </CustomBox>
        <CustomBox>
          <CustomButton onClick={onAddNewContactClick}>Create</CustomButton>
        </CustomBox>
      </CustomFlexBox>
    </>
  );
};

const AddContactDialogContent = ({ contact, onInputChange }) => {
  return (
    <>
      <CustomBox>
        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.firstName}
            label="First name"
            name={elementNames.firstName}
            onChange={onInputChange}
          />
        </CustomBox>
        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.lastName}
            label="Last name"
            name={elementNames.lastName}
            onChange={onInputChange}
          />
        </CustomBox>
        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.phoneNumber}
            label="Phone number"
            name={elementNames.phoneNumber}
            onChange={onInputChange}
          />
        </CustomBox>
      </CustomBox>
    </>
  );
};

const AddNewContactDialog = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      globalState: { dialogState },
    },
  } = useMainContext();

  const [contact, setContact] = useState(initialContact);

  const handleInputChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleAddNewContactClick = () => {
    dispatch(
      addNewContactController({
        countryCode: "98",
        countryName: "iran",
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
      })
    );

    setContact(initialContact);
  };

  const handleContactDialogClose = () => {
    onDialogClose("addContact");
  };

  return (
    <>
      <DialogTemplate
        titleContent={<AddContactDialogTitle />}
        dialogContent={
          <AddContactDialogContent
            contact={contact}
            onInputChange={handleInputChange}
          />
        }
        actionContent={
          <AddContactDialogActions
            onAddNewContactClick={(...args) => {
              handleAddNewContactClick(...args);
              handleContactDialogClose();
            }}
            onContactDialogClose={handleContactDialogClose}
          />
        }
        open={dialogState.addNewContact.open}
        paperStyle={{ height: "50vh" }}
        onClose={handleContactDialogClose}
      />
    </>
  );
};

export default AddNewContactDialog;
