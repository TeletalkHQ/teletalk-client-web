import { settingsList } from "./List";

export type SettingItem = (typeof settingsList)[number];

export type SettingDisplayName = SettingItem["displayName"];
