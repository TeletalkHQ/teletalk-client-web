import {
  Cellphone,
  ContactItem,
  FullNameWithUserId,
  Status,
} from "utility-store/lib/types";

import { Bio, StoreSetFn, StringMap, UserId, Username } from "~/types";

export interface BlacklistItem {
  userId: UserId;
}

export type Blacklist = BlacklistItem[];

export interface UserState extends FullNameWithUserId, Cellphone {
  bio: Bio;
  username: Username;
  status: Status;
  createdAt: number;
  contacts: ContactItem[];
}

export type ExtendedUserState = UserState & StringMap;

export interface UserHandlers {
  setUserData: (u: UserState) => void;
  addContact: (c: ContactItem) => void;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
