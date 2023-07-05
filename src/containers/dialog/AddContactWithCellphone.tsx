import React, { useState } from "react";
import { CountryName } from "utility-store/lib/types";
import { countries } from "utility-store/lib/variables/countries";

import { commonTasks } from "~/classes/CommonTasks";
import { maker } from "~/classes/Maker";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import AddContactComponents from "~/components/dialog/addContact";
import DialogTemplate from "~/components/dialog/template";
import { useGlobalStore } from "~/store";
import {
  AddContactWithCellphoneIO,
  CommonChangeEvent,
  SelectedCountry,
} from "~/types";
import { utilities } from "~/utilities";

const AddContactWithCellphone = () => {
  const state = useGlobalStore();

  const [addingContact, setAddingContact] = useState<
    AddContactWithCellphoneIO["input"]
  >(maker.emptyContactWithCellphone());
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);

  const handleInputChange = (event: CommonChangeEvent) => {
    setAddingContact({
      ...addingContact,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddContactClick = async () => {
    socketEmitterStore.events.addContactWithCellphone.emitFull<AddContactWithCellphoneIO>(
      addingContact,
      async (response) => {
        state.addUserWithContact({
          ...response.data.addedContact,
          isContact: true,
        });
        returnToContactsDialog();
        return response.data;
      }
    );
  };

  const closeAddContactDialog = () => {
    state.closeDialog("addContact");
    setSelectedCountry(null);
    setAddingContact(maker.emptyContact());
  };

  const returnToContactsDialog = () => {
    closeAddContactDialog();
    state.openDialog("contacts");
  };

  const handleCountryNameInputChange = (countryName: CountryName) => {
    setAddingContact({ ...addingContact, countryName });
  };

  const handleSelectedCountryChange = (value: SelectedCountry) => {
    setSelectedCountry(value);

    setAddingContact({
      ...addingContact,
      countryName: value?.countryName || "",
      countryCode: value?.countryCode || "",
    });
  };

  const selectCountryByCountryCodeInputChange = (value: string) => {
    const country = countries.find((i) => i.countryCode === value);
    setSelectedCountry(country || null);
  };

  const isAddContactButtonDisabled = () => {
    const firstNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "firstName",
      addingContact.firstName
    );

    const lastNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "lastName",
      addingContact.lastName
    );

    const phoneNumberValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "phoneNumber",
      addingContact.phoneNumber
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
        title={<AddContactComponents.Title />}
        content={
          <AddContactComponents.Content
            contact={addingContact}
            countryName={addingContact.countryName}
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
          <AddContactComponents.Actions
            onAddContactClick={handleAddContactClick}
            onContactDialogCancelClick={returnToContactsDialog}
            isAddContactButtonDisabled={isAddContactButtonDisabled()}
          />
        }
        open={state.dialogState.addContact.open}
        paperStyle={{
          height: "50vh",
        }}
        onClose={closeAddContactDialog}
      />
    </>
  );
};

export default AddContactWithCellphone;
