import { DialogName, ElementLabel, IconType } from "~/types";

export interface EditProfileListItem {
  name: DialogName;
  label: ElementLabel;
  disabled: boolean;
  value: string;
  Icon: IconType;
}

export type EditProfileListItemOnClick = (item: EditProfileListItem) => void;
