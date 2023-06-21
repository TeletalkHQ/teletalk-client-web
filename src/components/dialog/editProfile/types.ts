import {
  CountryCode,
  CountryName,
  DialogName,
  ElementLabel,
  IconType,
} from "~/types";

export interface EditProfileListItemProps {
  name: DialogName;
  label: ElementLabel;
  disabled: boolean;
  value: string;
  Icon: IconType;
}

export type EditProfileListItemOnClick = (
  item: EditProfileListItemProps
) => void;

export interface Profile {
  bio: string;
  countryCode: CountryCode;
  countryName: CountryName;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
}
