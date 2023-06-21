import { StoreSetFn } from ".";
import { CountryCode, CountryName } from "..";

export interface Profile {
  bio: string;
  countryCode: CountryCode;
  countryName: CountryName;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
}

export interface SettingsState {
  profile: Profile;
}

export interface SettingsHandlers {
  updateProfile: (p: Partial<Profile>) => void;
}

export type SettingsSetState = StoreSetFn<SettingsState>;

export type SettingsStore = SettingsHandlers & SettingsState;
