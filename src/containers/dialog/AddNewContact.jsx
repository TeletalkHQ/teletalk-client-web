import { useEffect, useState } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { commonTasks } from "src/classes/CommonTasks";
import { componentBuilder } from "src/classes/ComponentBuilder";
import { stuffStore } from "src/classes/StuffStore";

import AddNewContactComponents from "src/components/dialog/addNewContact";
import DialogTemplate from "src/components/dialog/Template";

import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "react-redux";

import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

import { utilities } from "src/utilities";

import { variables } from "src/variables";

const AddNewContact = componentBuilder
  .create()
  .registerComponent("AddNewContact", ({ onDialogClose }) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

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
      const country = arrayUtilities.findByPropValueEquality(
        state.other.countries,
        value,
        variables.other.helper.PROPS.COUNTRY_CODE
      );

      selectedCountryDispatcher(country);
    };

    const isAddNewContactButtonDisabled = () => {
      const firstNameValidateResult =
        commonTasks.validateInputValueLengthByModel(
          stuffStore.models.firstName,
          contact.firstName
        );

      const lastNameValidateResult =
        commonTasks.validateInputValueLengthByModel(
          stuffStore.models.lastName,
          contact.lastName
        );

      const phoneNumberValidateResult =
        commonTasks.validateInputValueLengthByModel(
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
