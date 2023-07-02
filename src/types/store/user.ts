import { Cellphone, FUllNameWithUserId } from "utility-store/lib/types";

import { StoreSetFn } from ".";
import { Bio, UserId, Username } from "../datatypes";

export interface BlacklistItem {
  userId: UserId;
}

export type Blacklist = BlacklistItem[];

export interface UserState extends FUllNameWithUserId, Cellphone {
  bio: Bio;
  blacklist: Blacklist;
  username: Username;
}

export interface UserHandlers {
  setUserData: (u: UserState) => void;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
