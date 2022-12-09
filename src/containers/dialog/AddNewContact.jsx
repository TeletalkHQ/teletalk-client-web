import { useState } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { commonTasks } from "src/classes/CommonTasks";
import { stuffStore } from "src/classes/StuffStore";

import CountryCode from "src/components/general/input/commonInput/CountryCode";
import CountrySelector from "src/components/general/input/commonInput/CountrySelector";
import CustomBox from "src/components/general/box/CustomBox";
import CustomButton from "src/components/general/input/CustomButton";
import CustomFlexBox from "src/components/general/box/CustomFlexBox";
import DialogTemplate from "src/components/dialog/Template";
import FirstName from "src/components/general/input/commonInput/FirstNameInput";
import H5 from "src/components/general/header/H5";
import LastName from "src/components/general/input/commonInput/LastNameInput";
import PhoneNumber from "src/components/general/input/commonInput/PhoneNumberInput";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

import { variables } from "src/variables";
import { componentBuilder } from "src/classes/ComponentBuilder";

const AddNewContact = componentBuilder
  .create()
  .registerComponent("AddNewContact", ({ onDialogClose }) => {
    const dispatch = useDispatch();
    const state = useSelector();

    const {
      hooksOutput: { dispatchAsync },
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

    const handleSelectedCountryChange = (newValue) => {
      const value = newValue || variables.common.object.country();
      selectedCountryDispatcher(value);

      setContact({
        ...contact,
        countryName: value.countryName,
        countryCode: value.countryCode,
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
          titleContent={<Title />}
          mainContent={
            <Content
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
            <Actions
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
  })
  .build();

const Title = componentBuilder
  .create()
  .registerComponent("AddNewContactTitle", () => {
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
  })
  .build();

const Content = componentBuilder
  .create()
  .registerComponent(
    "AddNewContactContent",
    ({
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
    }
  )
  .build();

const Actions = componentBuilder
  .create()
  .registerComponent(
    "AddNewContactActions",
    ({
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
    }
  )
  .build();

export default AddNewContact;
