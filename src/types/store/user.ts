import { Cellphone, FullNameWithUserId, Status } from "utility-store/lib/types";

import { StoreSetFn } from ".";
import { StringMap } from "..";
import { Bio, UserId, Username } from "../datatypes";

export interface BlacklistItem {
  userId: UserId;
}

export type Blacklist = BlacklistItem[];

export interface UserState extends FullNameWithUserId, Cellphone {
  bio: Bio;
  username: Username;
  status: Status;
  createdAt: number;
}

export type ExtendedUserState = UserState & StringMap;

export interface UserHandlers {
  setUserData: (u: UserState) => void;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
