import {
  CountryCode,
  CountryName,
  ElementLabel,
  IconType,
  ListItemName,
} from "~/types";

export interface EditProfileListItemProps {
  name: ListItemName;
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
