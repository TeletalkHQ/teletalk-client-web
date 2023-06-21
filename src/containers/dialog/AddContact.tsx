import React, { useState } from "react";

import { commonTasks } from "~/classes/CommonTasks";
import { userUtils } from "~/classes/UserUtils";
import { socketEmitterStore } from "~/classes/websocket/SocketEmitterStore";
import AddContactComponents from "~/components/dialog/addContact";
import DialogTemplate from "~/components/dialog/template";
import { countries } from "~/data/countries";
import { useGlobalStore } from "~/store";
import {
  AddContactWithCellphoneIO,
  CommonChangeEvent,
  ContactItem,
  CountryItem,
} from "~/types";
import { utilities } from "~/utilities";

const AddContact = () => {
  const state = useGlobalStore();

  const [contact, setContact] = useState<ContactItem>(
    userUtils.makeEmptyContactWithCellphone()
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(
    null
  );

  const handleInputChange = (event: CommonChangeEvent) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleAddContactClick = async () => {
    socketEmitterStore.events.addContactWithCellphone.emitFull<AddContactWithCellphoneIO>(
      contact,
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
    setContact(userUtils.makeEmptyContactWithCellphone());
  };

  const returnToContactsDialog = () => {
    closeAddContactDialog();
    state.openDialog("contacts");
  };

  const handleCountryNameInputChange = (countryName: string) => {
    setContact({ ...contact, countryName });
  };

  const handleSelectedCountryChange = (value: CountryItem | null) => {
    setSelectedCountry(value);

    setContact({
      ...contact,
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
      contact.firstName
    );

    const lastNameValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "lastName",
      contact.lastName
    );

    const phoneNumberValidateResult = commonTasks.isValueLengthInBetweenMinMax(
      "phoneNumber",
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
        title={<AddContactComponents.Title />}
        content={
          <AddContactComponents.Content
            contact={contact}
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

export default AddContact;
