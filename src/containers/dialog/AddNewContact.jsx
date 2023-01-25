import { useEffect, useState } from "react";

import { arrayUtilities } from "utility-store/src/classes/ArrayUtilities";

import { commonTasks } from "src/classes/CommonTasks";
import { stuffStore } from "src/classes/StuffStore";
import { componentBuilder } from "src/classes/ComponentBuilder";

import { Box } from "src/components/general/box";
import DialogTemplate from "src/components/dialog/Template";
import H5 from "src/components/general/typography/header/H5";
import { Input } from "src/components/general/input";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { commonActions } from "src/store/commonActions";
import { stateStatics } from "src/store/stateStatics";

import { utilities } from "src/utilities";

import { variables } from "src/variables";

const AddNewContact = componentBuilder
  .create()
  .registerComponent("AddNewContact", ({ onDialogClose }) => {
    const dispatch = useDispatch();
    const state = useSelector();

    const {
      hooksOutput: { dispatchAsync },
    } = useMainContext();

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
      const result = await dispatchAsync(controllers.addContact(rest));

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
        !utilities.isCountrySelected(selectedCountry)
      );
    };

    return (
      <>
        <DialogTemplate
          title={<Title />}
          content={
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
              selectedCountry={
                utilities.isCountrySelected(selectedCountry)
                  ? selectedCountry
                  : null
              }
            />
          }
          actions={
            <Actions
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

const Title = componentBuilder
  .create()
  .registerComponent("AddNewContactTitle", () => {
    return (
      <>
        <Box.Flex jc="space-between" ai="center">
          <Box.Div>
            <H5>New Contact</H5>
          </Box.Div>
          <Box.Div></Box.Div>
        </Box.Flex>
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
          <Box.Div>
            <Box.Div></Box.Div>

            <Box.Flex col jc="space-between" mt={2}>
              <Input.FullName
                firstName={contact.firstName}
                lastName={contact.lastName}
                onFirstNameInputChange={onInputChange}
                onLastNameInputChange={onInputChange}
              />

              <Input.Cellphone
                countries={countries}
                countryCode={contact.countryCode}
                countryName={countryName}
                onCountryCodeInputChange={onCountryCodeInputChange}
                onCountryNameInputChange={onCountryNameInputChange}
                onPhoneNumberInputChange={onInputChange}
                onSelectedCountryChange={onSelectedCountryChange}
                phoneNumber={contact.phoneNumber}
                selectedCountry={selectedCountry}
              />
            </Box.Flex>
          </Box.Div>
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
          <Box.Flex gap={1} jc="flex-end" ai="center">
            <Box.Div>
              <Input.Button variant="text" onClick={onContactDialogCancelClick}>
                Cancel
              </Input.Button>
            </Box.Div>
            <Box.Div>
              <Input.Button
                disabled={isAddNewContactButtonDisabled}
                variant="text"
                onClick={onAddNewContactClick}
              >
                Create
              </Input.Button>
            </Box.Div>
          </Box.Flex>
        </>
      );
    }
  )
  .build();

export default AddNewContact;
