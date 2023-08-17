import {
  Cellphone,
  CountryItem,
  FullName,
  FullNameWithUserId,
  PublicUserData,
  Status,
} from "utility-store/lib/types";

import {
  Bio,
  RemoveContactIO,
  StoreSetFn,
  StringMap,
  UserId,
  Username,
  VoidNoArgsFn,
} from "~/types";

export interface BlacklistItem {
  userId: UserId;
}

export type Blacklist = BlacklistItem[];

export type UserItem = PublicUserData &
  Cellphone & {
    isContact: boolean;
    isBlocked: boolean;
    originalFirstName: string;
    originalLastName: string;
  };

export type CurrentUserData = FullNameWithUserId &
  Cellphone & {
    bio: Bio;
    username: Username;
    status: Status;
    createdAt: number;
  };

export type Users = UserItem[];

export type AddingContactWithCellphone = FullName & Cellphone;
export interface UserState {
  currentUserData: CurrentUserData;
  selectedContactFromContext: UserItem;
  users: Users;
  addingContactWithCellphone: AddingContactWithCellphone;
}

export type ExtendedCurrentUserData = CurrentUserData & StringMap;

export type ExtendedCountryItem = CountryItem & StringMap;

export interface UserHandlers {
  removeContact: (u: RemoveContactIO["output"]["removedContact"]) => void;
  reset: VoidNoArgsFn;
  setAddingContactWithCellphone: (item: AddingContactWithCellphone) => void;
  setCurrentUserData: (u: CurrentUserData) => void;
  setSelectedContactFromContext: (c: UserItem) => void;
  setUsers: (u: Users) => void;
  updateUser: (u: Partial<UserItem>) => void;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
