import { countries } from "utility-store/lib/variables/countries";

import { Input } from "~/components";
import Box from "~/components/general/box";
import { OnChangeValidatorFn, SelectedCountry } from "~/types";

interface Props {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
  onChange: OnChangeValidatorFn;
}

const Cellphone: React.FC<Props> = ({
  countryCode,
  countryName,
  onChange,
  phoneNumber,
}) => {
  const handleCountryNameOnChange: OnChangeValidatorFn = (countryName, e) => {
    onChange(countryName, e);
  };

  const handleSelectedCountryOnChange = (value: SelectedCountry) => {
    const { countryCode = "", countryName = "" } = value || {};

    onChange(countryName, {
      target: {
        name: "countryName",
        value: countryName,
      },
    });

    onChange(countryCode, {
      target: {
        name: "countryCode",
        value: countryCode,
      },
    });
  };

  const handleCountryCodeOnChange: OnChangeValidatorFn = (value, e) => {
    const country = countries.find((i) => i.countryCode === value);

    onChange(value, e);
    onChange(country?.countryName || "", e);
  };

  const handlePhoneNumberOnChange: OnChangeValidatorFn = (value, e) => {
    onChange(value, e);
  };

  return (
    <>
      <Input.CountrySelector
        countryCode={countryCode}
        countryName={countryName}
        onSelectChange={handleSelectedCountryOnChange}
        countryNameOnChange={handleCountryNameOnChange}
      />

      <Box.Flex jc="space-between" style={{ width: "100%" }}>
        <Input.CountryCode
          value={countryCode}
          onChange={handleCountryCodeOnChange}
        />
        <Input.PhoneNumber
          onChange={handlePhoneNumberOnChange}
          value={phoneNumber}
        />
      </Box.Flex>
    </>
  );
};

export default Cellphone;
