import { StoreSetFn } from ".";
import { Id } from "..";

export type UserId = Id;

export interface BlacklistItem {
  userId: UserId;
}

export type Blacklist = BlacklistItem[];

export interface UserState {
  bio: string;
  blacklist: Blacklist;
  countryCode: string;
  countryName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userId: UserId;
  username: string;
}

export interface UserHandlers {
  setUserData: (u: UserState) => void;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
