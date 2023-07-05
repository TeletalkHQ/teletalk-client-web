import { settingsList } from "./List";

export type SettingItem = (typeof settingsList)[number];

export type SettingDisplayName = SettingItem["displayName"];

export type OnSettingItemClick = (item: SettingItem) => void;
