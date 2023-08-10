import {
  Cellphone,
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

export interface UserState {
  currentUserData: CurrentUserData;

  selectedContactFromContext: UserItem;
  users: Users;
}

export type ExtendedCurrentUserData = CurrentUserData & StringMap;

export interface UserHandlers {
  setCurrentUserData: (u: CurrentUserData) => void;
  removeContact: (u: RemoveContactIO["output"]["removedContact"]) => void;
  setSelectedContactFromContext: (c: UserItem) => void;
  setUsers: (u: Users) => void;
  updateUser: (u: Partial<UserItem>) => void;
  reset: VoidNoArgsFn;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
