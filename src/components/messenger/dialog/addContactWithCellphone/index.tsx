import React, { useState } from "react";
import { CountryCode, CountryName } from "utility-store/lib/types";
import { countries } from "utility-store/lib/variables/countries";

import { maker } from "~/classes/Maker";
import Actions from "~/components/messenger/dialog/addContactWithCellphone/Actions";
import Content from "~/components/messenger/dialog/addContactWithCellphone/Content";
import Title from "~/components/messenger/dialog/addContactWithCellphone/Title";
import DialogTemplate from "~/components/messenger/dialog/template";
import { useEmitter } from "~/hooks/useEmitter";
import { useListener } from "~/hooks/useListener";
import { useGlobalStore } from "~/store";
import {
  AddContactWithCellphoneIO,
  CommonChangeEvent,
  SelectedCountry,
} from "~/types";
import { utils } from "~/utils";

const AddContactWithCellphone = () => {
  const globalStore = useGlobalStore();
  const { handler, loading } = useEmitter("addContactWithCellphone");

  useListener({
    evName: "addContactWithCellphone",
    cb(response) {
      globalStore.addUser({
        ...maker.emptyUserPublicData(),
        ...response.data.addedContact,
        isContact: true,
        isPublicDataUpdated: false,
      });
    },
  });

  const [addingContact, setAddingContact] = useState<
    AddContactWithCellphoneIO["input"]
  >(maker.emptyContactWithCellphone);
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountry>(null);

  const handleInputChange = (_value: string, event: CommonChangeEvent) => {
    setAddingContact({
      ...addingContact,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddContactClick = () => {
    handler.emitFull(addingContact, returnToContactsDialog);
  };

  const closeAddContactDialog = () => {
    globalStore.closeDialog("addContact");
    setSelectedCountry(null);
    setAddingContact(maker.emptyContactWithCellphone);
  };

  const returnToContactsDialog = () => {
    closeAddContactDialog();
    globalStore.openDialog("contacts");
  };

  const handleCountryNameInputChange = (
    countryName: CountryName,
    _e: CommonChangeEvent
  ) => {
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

  const handleOnCountryCodeChange = (
    value: CountryCode,
    event: CommonChangeEvent
  ) => {
    handleInputChange(value, event);
    selectCountryByCountryCodeInputChange(value);
  };

  const isSubmitDisabled = utils.isContactWithCellphoneValid(addingContact);

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
            onCountryCodeInputChange={handleOnCountryCodeChange}
            onInputChange={handleInputChange}
            selectedCountry={
              utils.isCountrySelected(selectedCountry) ? selectedCountry : null
            }
          />
        }
        actions={
          <Actions
            loading={loading}
            onAddContactClick={handleAddContactClick}
            onContactDialogCancelClick={returnToContactsDialog}
            isAddContactButtonDisabled={isSubmitDisabled}
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
