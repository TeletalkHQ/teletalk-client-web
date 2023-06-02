import { componentBuilder } from "~/classes/ComponentBuilder";

import { Box } from "~/components/general/box";
import { Input } from "~/components/general/input";

const AddNewContactContent = componentBuilder
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

export default AddNewContactContent;
