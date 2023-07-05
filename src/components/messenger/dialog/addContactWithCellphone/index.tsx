import React, { useState } from "react";
import { CountryName } from "utility-store/lib/types";
import { countries } from "utility-store/lib/variables/countries";

import { maker } from "~/classes/Maker";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import Actions from "~/components/messenger/dialog/addContactWithCellphone/Actions";
import Content from "~/components/messenger/dialog/addContactWithCellphone/Content";
import Title from "~/components/messenger/dialog/addContactWithCellphone/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useGlobalStore, useUserStore } from "~/store";
import {
  AddContactWithCellphoneIO,
  CommonChangeEvent,
  SelectedCountry,
} from "~/types";
import { utils } from "~/utils";

const AddContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const userStore = useUserStore();

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
        userStore.addContact(response.data.addedContact);
        returnToContactsDialog();
        return response.data;
      }
    );
  };

  const closeAddContactDialog = () => {
    globalStore.closeDialog("addContact");
    setSelectedCountry(null);
    setAddingContact(maker.emptyContact());
  };

  const returnToContactsDialog = () => {
    closeAddContactDialog();
    globalStore.openDialog("contacts");
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
    const firstNameValidateResult = utils.isValueLengthInBetweenMinMax(
      "firstName",
      addingContact.firstName
    );

    const lastNameValidateResult = utils.isValueLengthInBetweenMinMax(
      "lastName",
      addingContact.lastName
    );

    const phoneNumberValidateResult = utils.isValueLengthInBetweenMinMax(
      "phoneNumber",
      addingContact.phoneNumber
    );

    return ![
      firstNameValidateResult,
      phoneNumberValidateResult,
      lastNameValidateResult,
      utils.isCountrySelected(selectedCountry),
    ].some(Boolean);
  };

  return (
    <>
      <DialogTemplate
        title={<Title />}
        content={
          <Content
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
              utils.isCountrySelected(selectedCountry) ? selectedCountry : null
            }
          />
        }
        actions={
          <Actions
            onAddContactClick={handleAddContactClick}
            onContactDialogCancelClick={returnToContactsDialog}
            isAddContactButtonDisabled={isAddContactButtonDisabled()}
          />
        }
        open={globalStore.dialogState.addContact.open}
        paperStyle={{
          height: "50vh",
        }}
        onClose={closeAddContactDialog}
      />
    </>
  );
};

export default AddContactWithCellphone;