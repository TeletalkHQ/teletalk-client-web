import Box from "~/components/general/box";

import { Input } from "~/components/general/input";

import { CountryCode, CountryItem, CountryName, VoidNoArgsFn } from "~/types";

import { utilities } from "~/utilities";

interface Props {
  countryCode: CountryCode;
  countryName: CountryName;
  onCountryCodeInputChange: VoidNoArgsFn;
  onCountryNameInputChange: VoidNoArgsFn;
  onPhoneNumberInputChange: VoidNoArgsFn;
  onSelectedCountryChange: VoidNoArgsFn;
  phoneNumber: string;
  selectedCountry: CountryItem;
}

const Cellphone: React.FC<Props> = ({
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
        countryName={countryName}
        onSelectChange={onSelectedCountryChange}
        onInputChange={onCountryNameInputChange}
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
