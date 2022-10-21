import { useState } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import CountryCode from "components/commonInputs/CountryCode";
import CountrySelector from "components/commonInputs/CountrySelector";
import CustomBox from "components/generals/boxes/CustomBox";
import CustomButton from "components/generals/inputs/CustomButton";
import CustomFlexBox from "components/generals/boxes/CustomFlexBox";
import DialogTemplate from "components/dialogs/DialogTemplate";
import FirstName from "components/commonInputs/FirstNameInput";
import H5 from "components/generals/typographies/H5";
import LastName from "components/commonInputs/LastNameInput";
import PhoneNumber from "components/commonInputs/PhoneNumberInput";

import { commonActions } from "functions/utilities/commonActions";

import { controllers } from "controllers/controllers";

import { useMainContext } from "hooks/useMainContext";

import { DIALOG_NAMES } from "variables/otherVariables/helpers";
import { initialObjects } from "variables/initials/initialObjects";

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
  onContactDialogCancelClick,
}) => {
  return (
    <>
      {/* //TODO: Extract to static vars */}
      <CustomFlexBox gap={1} jc="flex-end" ai="center">
        <CustomBox>
          <CustomButton variant="text" onClick={onContactDialogCancelClick}>
            Cancel
          </CustomButton>
        </CustomBox>
        <CustomBox>
          <CustomButton variant="text" onClick={onAddNewContactClick}>
            Create
          </CustomButton>
        </CustomBox>
      </CustomFlexBox>
    </>
  );
};

const AddContactDialogContent = ({
  contact,
  countries,
  countryName,
  onCountryCodeInputChange,
  onCountryNameInputChange,
  onInputChange,
  onSelectedCountryChange,
  selectedCountry,
}) => {
  return (
    <>
      <CustomBox>
        <CountrySelector
          countries={countries}
          countryName={countryName}
          onSelectedCountryChange={onSelectedCountryChange}
          onCountryNameInputChange={onCountryNameInputChange}
          selectedCountry={selectedCountry}
        />

        <CustomBox mt={2}>
          <FirstName.WithValidator
            inputValue={contact.firstName}
            onInputChange={onInputChange}
          />
        </CustomBox>

        <CustomBox mt={2}>
          <LastName.WithValidator
            inputValue={contact.lastName}
            onInputChange={onInputChange}
          />
        </CustomBox>
        <CustomFlexBox gap={1} jc="space-between" mt={2}>
          <CountryCode.WithValidator
            inputValue={contact.countryCode}
            onInputChange={onCountryCodeInputChange}
          />

          <PhoneNumber.WithValidator
            inputValue={contact.phoneNumber}
            onInputChange={onInputChange}
          />
        </CustomFlexBox>
      </CustomBox>
    </>
  );
};

const AddNewContactDialog = ({ onDialogClose }) => {
  const {
    hooksOutput: { dispatch },
    state: {
      global: { dialogState },
      other: { countries },
    },
  } = useMainContext();

  const [contact, setContact] = useState(() => initialObjects.contact());
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleInputChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleAddNewContactClick = () => {
    const { privateId, ...rest } = contact;
    dispatch(controllers.addNewContact(rest));

    setContact(initialObjects.c());
  };

  const handleContactDialogClose = () => {
    onDialogClose(DIALOG_NAMES.ADD_NEW_CONTACT);
    selectedCountryDispatcher();
    setContact(initialObjects.contact());
  };

  const handleContactDialogCancelClick = () => {
    dispatch(commonActions.openDialog(DIALOG_NAMES.CONTACTS));
    dispatch(commonActions.closeDialog(DIALOG_NAMES.ADD_NEW_CONTACT));
    selectedCountryDispatcher();
    setContact(initialObjects.contact());
  };

  const handleCountryNameInputChange = (countryName) => {
    setContact({ ...contact, countryName });
  };

  const handleSelectedCountryChange = (newValue) => {
    selectedCountryDispatcher(newValue);

    setContact({
      ...contact,
      countryName: newValue?.countryName || "",
      countryCode: newValue?.countryCode || "",
    });
  };

  const selectedCountryDispatcher = (country) => {
    setSelectedCountry(country || null);
  };

  const selectCountryByCountryCodeInputChange = (value) => {
    const country = arrayUtilities.findByPropValueEquality(
      countries,
      value,
      "countryCode"
    );

    selectedCountryDispatcher(country);
  };

  return (
    <>
      <DialogTemplate
        titleContent={<AddContactDialogTitle />}
        mainContent={
          <AddContactDialogContent
            contact={contact}
            countries={countries}
            countryCode={contact.countryCode}
            countryName={contact.countryName}
            onCountryNameInputChange={handleCountryNameInputChange}
            onSelectedCountryChange={handleSelectedCountryChange}
            onCountryCodeInputChange={(event) => {
              handleInputChange(event);
              selectCountryByCountryCodeInputChange(event.target.value);
            }}
            onInputChange={handleInputChange}
            selectedCountry={selectedCountry}
          />
        }
        actionContent={
          <AddContactDialogActions
            onAddNewContactClick={(...args) => {
              handleAddNewContactClick(...args);
            }}
            onContactDialogCancelClick={handleContactDialogCancelClick}
          />
        }
        open={dialogState.addNewContact.open}
        paperStyle={{
          height: "50vh",
        }}
        onClose={handleContactDialogClose}
      />
    </>
  );
};

export default AddNewContactDialog;
