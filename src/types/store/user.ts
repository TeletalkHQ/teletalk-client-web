import {
  Cellphone,
  ContactItem,
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
  VoidWithArg,
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
  addingContactWithUserId: FullName;
}

export type ExtendedCurrentUserData = CurrentUserData & StringMap;

export type ExtendedCountryItem = CountryItem & StringMap;

export interface UserHandlers {
  addBlock: VoidWithArg<BlacklistItem>;
  addContactWithCellphone: VoidWithArg<ContactItem>;
  addContactWithUserId: VoidWithArg<ContactItem>;
  removeBlock: VoidWithArg<BlacklistItem>;
  removeContact: VoidWithArg<RemoveContactIO["output"]["removedContact"]>;
  reset: VoidNoArgsFn;
  setAddingContactWithCellphone: VoidWithArg<
    Partial<AddingContactWithCellphone>
  >;
  setAddingContactWithUserId: VoidWithArg<Partial<FullName>>;
  setCurrentUserData: VoidWithArg<CurrentUserData>;
  setSelectedContactFromContext: VoidWithArg<UserItem>;
  setUsers: VoidWithArg<Users>;
  updateCurrentUserPublicData: VoidWithArg<PublicUserData>;
  updateUser: VoidWithArg<Partial<UserItem> & { userId: UserId }>;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
