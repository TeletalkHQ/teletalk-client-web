import { Input } from "~/components";
import type {
  CountrySelectInputChange,
  OnCountryNameInputChange,
} from "~/components/common/countrySelector";
import Box from "~/components/general/box";
import { OnChangeValidatorFn, SelectedCountry } from "~/types";
import { utils } from "~/utils";

interface Props {
  countryCode: string;
  countryName: string;
  onCountryCodeInputChange: OnChangeValidatorFn;
  onCountryNameInputChange: OnCountryNameInputChange;
  onPhoneNumberInputChange: OnChangeValidatorFn;
  onSelectedCountryChange: CountrySelectInputChange;
  phoneNumber: string;
  selectedCountry: SelectedCountry;
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
          utils.isCountrySelected(selectedCountry) ? selectedCountry : null
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
