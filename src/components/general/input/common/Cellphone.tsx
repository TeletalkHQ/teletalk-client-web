import Box from "~/components/general/box";
import { Input } from "~/components/general/input";
import type {
  CountrySelectInputChange,
  OnCountryNameInputChange,
} from "~/components/general/input/common/countrySelector";
import { CommonOnChange, CountryItem } from "~/types";
import { utilities } from "~/utilities";

interface Props {
  countryCode: string;
  countryName: string;
  onCountryCodeInputChange: CommonOnChange;
  onCountryNameInputChange: OnCountryNameInputChange;
  onPhoneNumberInputChange: CommonOnChange;
  onSelectedCountryChange: CountrySelectInputChange;
  phoneNumber: string;
  selectedCountry: CountryItem | null;
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
        onCountryNameInputChange={onCountryNameInputChange}
        selectedCountry={
          utilities.isCountrySelected(selectedCountry) ? selectedCountry : null
        }
      />
      <Box.Flex jc="space-between" style={{ width: "100%" }}>
        <Input.CountryCode
          value={countryCode}
          onChange={onCountryCodeInputChange}
        />
        <Input.PhoneNumber
          onChange={onPhoneNumberInputChange}
          value={phoneNumber}
        />
      </Box.Flex>
    </>
  );
};

export default Cellphone;
