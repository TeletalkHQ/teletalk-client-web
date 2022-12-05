import { useState } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { commonTasks } from "classes/CommonTasks";
import { stuffStore } from "classes/StuffStore";

import CountryCode from "components/general/input/commonInput/CountryCode";
import CountrySelector from "components/general/input/commonInput/CountrySelector";
import CustomBox from "components/general/box/CustomBox";
import CustomButton from "components/general/input/CustomButton";
import CustomFlexBox from "components/general/box/CustomFlexBox";
import DialogTemplate from "components/dialog/Template";
import FirstName from "components/general/input/commonInput/FirstNameInput";
import H5 from "components/general/header/H5";
import LastName from "components/general/input/commonInput/LastNameInput";
import PhoneNumber from "components/general/input/commonInput/PhoneNumberInput";

import { controllers } from "controllers";

import { useMainContext } from "hooks/useMainContext";

import { commonActions } from "store/commonActions";
import { stateStatics } from "store/stateStatics";

import { variables } from "variables";

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
  isAddNewContactButtonDisabled,
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
          <CustomButton
            disabled={isAddNewContactButtonDisabled}
            variant="text"
            onClick={onAddNewContactClick}
          >
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
    hooksOutput: { dispatch, dispatchAsync },
    state,
  } = useMainContext();

  const [contact, setContact] = useState(variables.common.object.contact);
  const [selectedCountry, setSelectedCountry] = useState(
    variables.common.object.country
  );

  //CLEANME: It is duplicate, Check SignIn.jsx
  const isCountrySelected = () => {
    const country = selectedCountry;

    return !!(
      country.countryCode &&
      country.countryName &&
      country.countryShortName
    );
  };

  const handleInputChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleAddNewContactClick = async () => {
    const { userId, ...rest } = contact;
    const result = await dispatchAsync(controllers.addNewContact(rest));

    if (result.ok === false) return;

    handleReturnToContactsDialog();
  };

  const handleCloseAddNewContactDialog = () => {
    onDialogClose(stateStatics.DIALOG_NAMES.ADD_NEW_CONTACT);
    selectedCountryDispatcher();
    setContact(variables.common.object.contact());
  };

  const handleReturnToContactsDialog = () => {
    handleCloseAddNewContactDialog();
    dispatch(commonActions.openDialog(stateStatics.DIALOG_NAMES.CONTACTS));
  };

  const handleCountryNameInputChange = (countryName) => {
    setContact({ ...contact, countryName });
  };

  const handleSelectedCountryChange = (
    newValue = variables.common.object.country()
  ) => {
    selectedCountryDispatcher(newValue);

    setContact({
      ...contact,
      countryName: newValue.countryName,
      countryCode: newValue.countryCode,
    });
  };

  const selectedCountryDispatcher = (
    country = variables.common.object.country()
  ) => {
    setSelectedCountry(country);
  };

  const selectCountryByCountryCodeInputChange = (value) => {
    const country = arrayUtilities.findByPropValueEquality(
      state.other.countries,
      value,
      "countryCode"
    );

    selectedCountryDispatcher(country);
  };

  const isAddNewContactButtonDisabled = () => {
    const firstNameValidateResult =
      commonTasks.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.firstName,
        contact.firstName
      );

    const lastNameValidateResult =
      commonTasks.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.lastName,
        contact.lastName
      );

    const phoneNumberValidateResult =
      commonTasks.validateInputValueLengthByModelMinMaxLength(
        stuffStore.models.phoneNumber,
        contact.phoneNumber
      );

    return (
      !firstNameValidateResult ||
      !phoneNumberValidateResult ||
      !lastNameValidateResult ||
      !isCountrySelected()
    );
  };

  return (
    <>
      <DialogTemplate
        titleContent={<AddContactDialogTitle />}
        mainContent={
          <AddContactDialogContent
            contact={contact}
            countries={state.other.countries}
            countryCode={selectedCountry?.countryCode}
            countryName={contact.countryName}
            onCountryNameInputChange={handleCountryNameInputChange}
            onSelectedCountryChange={handleSelectedCountryChange}
            onCountryCodeInputChange={(event) => {
              handleInputChange(event);
              selectCountryByCountryCodeInputChange(event.target.value);
            }}
            onInputChange={handleInputChange}
            selectedCountry={isCountrySelected() ? selectedCountry : null}
          />
        }
        actionContent={
          <AddContactDialogActions
            onAddNewContactClick={handleAddNewContactClick}
            onContactDialogCancelClick={handleReturnToContactsDialog}
            isAddNewContactButtonDisabled={isAddNewContactButtonDisabled()}
          />
        }
        open={state.global.dialogState.addNewContact.open}
        paperStyle={{
          height: "50vh",
        }}
        onClose={handleCloseAddNewContactDialog}
      />
    </>
  );
};

export default AddNewContactDialog;
