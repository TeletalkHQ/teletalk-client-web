import { Cellphone, FullName } from "utility-store/lib/types";

import { Bio, Username } from "~/types/datatypes";

import { StoreSetFn } from ".";

export interface Profile extends Cellphone, FullName {
  bio: Bio;
  username: Username;
}

export interface SettingsState {
  profile: Profile;
}

export interface SettingsHandlers {
  updateProfile: (p: Partial<Profile>) => void;
}

export type SettingsSetState = StoreSetFn<SettingsState>;

export type SettingsStore = SettingsHandlers & SettingsState;
