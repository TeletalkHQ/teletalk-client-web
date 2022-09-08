import { useState } from "react";

import { useMainContext } from "hooks/useMainContext";

import DialogTemplate from "components/dialogs/DialogTemplate";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomBox from "components/generals/boxes/CustomBox";

import { addNewContactController } from "controllers/cellphoneControllers/addNewContactController";

import { initialContact } from "variables/initials/initialValues/initialValues";
import CustomTypography from "components/generals/typographies/CustomTypography";

const AddNewContactDialog = ({ onClose }) => {
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

  const handleAddNewContact = () => {
    dispatch(
      addNewContactController({
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
      <CustomFlexBox jc="space-between" ai="center">
        <CustomBox>
          <CustomTypography>New Contact</CustomTypography>
        </CustomBox>
        <CustomBox></CustomBox>
      </CustomFlexBox>
    </>
  );

  const dialogContent = (
    <>
      <CustomBox>
        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.firstName}
            label="First name"
            name="firstName"
            onChange={handleInputChange}
          />
        </CustomBox>
        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.lastName}
            label="Last name"
            name="lastName"
            onChange={handleInputChange}
          />
        </CustomBox>
        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.phoneNumber}
            label="Phone number"
            name="phoneNumber"
            onChange={handleInputChange}
          />
        </CustomBox>
      </CustomBox>
    </>
  );

  const actionContent = (
    <>
      <CustomFlexBox jc="flex-end" ai="center">
        <CustomBox>
          <CustomButton onClick={handleOnClose}>Cancel</CustomButton>
        </CustomBox>
        <CustomBox>
          <CustomButton onClick={handleAddNewContact}>Create</CustomButton>
        </CustomBox>
      </CustomFlexBox>
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
