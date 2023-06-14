import { useEffect, useState } from "react";

import { commonTasks } from "~/classes/CommonTasks";
import { componentBuilder } from "~/classes/ComponentBuilder";
import { stuffStore } from "~/classes/StuffStore";

import AddNewContactComponents from "~/components/dialog/addNewContact";
import DialogTemplate from "~/components/dialog/Template";

import { controllers } from "~/controllers";

import { commonActions } from "~/store/commonActions";
import { stateStatics } from "~/store/stateStatics";

import { utilities } from "~/utilities";

import { variables } from "~/variables";

const AddNewContact = componentBuilder
  .create()
  .registerComponent("AddNewContact", ({ onDialogClose }) => {
    useEffect(() => {
      const fn = async () => {
        dispatch(controllers.getCountries());
      };

      fn();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [contact, setContact] = useState(variables.common.object.contact);
    const [selectedCountry, setSelectedCountry] = useState(
      variables.common.object.country
    );

    const handleInputChange = (event) => {
      setContact({ ...contact, [event.target.name]: event.target.value });
    };

    const handleAddNewContactClick = async () => {
      const { userId, ...rest } = contact;
      const result = dispatch(controllers.addContact(rest));

      if (result.ok === false) return;

      handleReturnToContactsDialog();
    };

    const handleCloseAddNewContactDialog = () => {
      onDialogClose(stateStatics.DIALOG_NAMES.ADD_CONTACT);
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
      const country = state.other.countries.find(
        (i) => i.countryCode === value
      );

      selectedCountryDispatcher(country);
    };

    const isAddNewContactButtonDisabled = () => {
      const firstNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
        stuffStore.models.firstName,
        contact.firstName
      );

      const lastNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
        stuffStore.models.lastName,
        contact.lastName
      );

      const phoneNumberValidateResult =
        commonTasks.isValueLengthInBetweenMinMax(
          stuffStore.models.phoneNumber,
          contact.phoneNumber
        );

      return ![
        firstNameValidateResult,
        phoneNumberValidateResult,
        lastNameValidateResult,
        utilities.isCountrySelected(selectedCountry),
      ].some(Boolean);
    };

    return (
      <>
        <DialogTemplate
          title={<AddNewContactComponents.Title />}
          content={
            <AddNewContactComponents.Content
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
              selectedCountry={
                utilities.isCountrySelected(selectedCountry)
                  ? selectedCountry
                  : null
              }
            />
          }
          actions={
            <AddNewContactComponents.Actions
              onAddNewContactClick={handleAddNewContactClick}
              onContactDialogCancelClick={handleReturnToContactsDialog}
              isAddNewContactButtonDisabled={isAddNewContactButtonDisabled()}
            />
          }
          open={state.global.dialogState.addContact.open}
          paperStyle={{
            height: "50vh",
          }}
          onClose={handleCloseAddNewContactDialog}
        />
      </>
    );
  })
  .build();

export default AddNewContact;
