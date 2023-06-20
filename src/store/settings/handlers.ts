import { SettingsHandlers, SettingsSetState } from "~/types";

export const handlers = (set: SettingsSetState) =>
  ({
    updateProfile(profile) {
      set((prevState) => ({
        profile: { ...prevState.profile, ...profile },
      }));
    },
  } as SettingsHandlers);
