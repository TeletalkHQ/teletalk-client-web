import { useState } from "react";

import { useMainContext } from "hooks/useMainContext";

import CountrySelector from "components/otherComponents/CountrySelector";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import CustomTextInput from "components/generals/inputs/CustomTextInput";
import DialogTemplate from "components/dialogs/DialogTemplate";

import { addNewContactController } from "controllers/cellphoneControllers/addNewContactController";

import { elementNames } from "variables/initials/initialValues/elementNames";
import { initialContact } from "variables/initials/initialValues/initialValues";
import H5 from "components/generals/typographies/H5";

const AddContactDialogTitle = () => {
  return (
    <>
      <CustomFlexBox jc="space-between" ai="center">
        <CustomBox>
          <H5>New Contact</H5>
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
      {/* //TODO: Extract to static vars */}
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

const AddContactDialogContent = ({
  contact,
  countries,
  countryName,
  onCountryNameAutocompleteInputChange,
  onCountryNameInputChange,
  onInputChange,
  selectedCountry,
}) => {
  return (
    <>
      <CustomBox>
        <CustomBox>
          <CountrySelector
            countries={countries}
            countryName={countryName}
            onCountryNameAutocompleteInputChange={
              onCountryNameAutocompleteInputChange
            }
            onCountryNameInputChange={onCountryNameInputChange}
            selectedCountry={selectedCountry}
          />
        </CustomBox>

        <CustomBox mt={2}>
          <CustomTextInput
            value={contact.firstName}
            //TODO: Extract to static vars
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
      otherState: { countries },
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
            countries={countries}
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
