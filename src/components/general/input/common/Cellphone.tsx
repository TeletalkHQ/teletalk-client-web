import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";

import { utilities } from "src/utilities";

const Cellphone = ({
  countries,
  countryCode,
  countryName,
  onCountryCodeInputChange,
  onCountryNameInputChange,
  onPhoneNumberInputChange,
  onSelectedCountryChange,
  phoneNumber,
  selectedCountry,
}) => {
  return (
    <>
      <Input.CountrySelector
        countries={countries}
        countryName={countryName}
        onSelectedCountryChange={onSelectedCountryChange}
        onCountryNameInputChange={onCountryNameInputChange}
        selectedCountry={
          utilities.isCountrySelected(selectedCountry) ? selectedCountry : null
        }
      />
      <Box.Flex jc="space-between" style={{ width: "100%" }}>
        <Input.CountryCode.WithValidator
          inputValue={countryCode}
          onInputChange={onCountryCodeInputChange}
        />
        <Input.PhoneNumber.WithValidator
          onInputChange={onPhoneNumberInputChange}
          inputValue={phoneNumber}
        />
      </Box.Flex>
    </>
  );
};

export default Cellphone;
