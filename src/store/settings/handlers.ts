import { SettingsHandlers, SettingsSetState } from "~/types";

export const handlers: (set: SettingsSetState) => SettingsHandlers = (set) => ({
  updateProfile(profile) {
    set((prevState) => ({
      profile: { ...prevState.profile, ...profile },
    }));
  },
});
