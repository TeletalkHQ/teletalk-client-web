import { ListItemProps } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { SyntheticEvent } from "react";
import { CountryItem, CountryName } from "utility-store/lib/types";
import { countries } from "utility-store/lib/variables/countries";

import Option from "~/components/common/countrySelector/Option";
import SelectorInput from "~/components/common/countrySelector/SelectorInput";
import {
  CommonChangeEvent,
  OnChangeValidatorFn,
  SelectedCountry,
} from "~/types";

export type CountrySelectInputChange = (value: SelectedCountry) => void;

export type OnCountryNameInputChange = (
  value: CountryName,
  e: CommonChangeEvent
) => void;

interface Props {
  countryName: string;
  selectedCountry: SelectedCountry;
  onCountryNameInputChange: OnChangeValidatorFn;
  onSelectChange: CountrySelectInputChange;
}

const CountrySelector: React.FC<Props> = ({
  countryName,
  onCountryNameInputChange,
  onSelectChange,
  selectedCountry,
}) => {
  const getOptionLabel = (option: CountryItem) => option.countryName;

  const handleCountryNameInputChange = (
    _event: SyntheticEvent,
    value: CountryName
  ) => {
    onCountryNameInputChange(value, _event as CommonChangeEvent);
  };

  const handleSelectedCountryChange = (
    _event: SyntheticEvent,
    newValue: SelectedCountry
  ) => {
    onSelectChange(newValue);
  };

  const renderOption = (props: ListItemProps, option: CountryItem) => (
    <Option key={option.countryName} props={props} option={option} />
  );

  return (
    <Autocomplete
      autoHighlight
      fullWidth
      getOptionLabel={getOptionLabel}
      inputValue={countryName}
      onChange={handleSelectedCountryChange}
      onInputChange={handleCountryNameInputChange}
      options={countries}
      renderInput={SelectorInput}
      renderOption={renderOption}
      value={selectedCountry}
    />
  );
};

export default CountrySelector;
