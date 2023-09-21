import type {
  AvatarSrc,
  Bio,
  Cellphone,
  ContactItem,
  ContactItemWithEmptyCellphone,
  CountryItem,
  EmptyCellphone,
  FullName,
  FullNameWithUserId,
  RemoveContactIO,
  Status,
  UnknownCellphone,
  UserId,
  UserPublicData,
  Username,
} from "teletalk-type-store";

import { StoreSetFn, StringMap, VoidNoArgsFn, VoidWithArg } from "~/types";

export interface BlacklistItem {
  userId: UserId;
}

export type Blacklist = BlacklistItem[];

export type UserItem = UserPublicData &
  UnknownCellphone & {
    avatarSrc: AvatarSrc;
    isContact: boolean;
    isBlocked: boolean;
    originalFirstName: string;
    originalLastName: string;
  };
export type Users = UserItem[];

export interface OnlineUser {
  userId: UserId;
  isOnline: boolean;
}

export type OnlineUserList = OnlineUser[];

export type CurrentUserData = FullNameWithUserId &
  Cellphone & {
    bio: Bio;
    username: Username;
    status: Status;
    createdAt: number;
    avatarSrc: AvatarSrc;
  };

export type AddingContactWithCellphone = FullName & EmptyCellphone;
export interface UserState {
  currentUserData: CurrentUserData;
  selectedUserIdForActions: UserId;
  users: Users;
  addingContactWithCellphone: AddingContactWithCellphone;
  addingContactWithUserId: FullName;
  onlineUsers: OnlineUserList;
}

export type ExtendedCurrentUserData = CurrentUserData & StringMap;

export type ExtendedCountryItem = CountryItem & StringMap;

export interface UserHandlers {
  addBlock: VoidWithArg<BlacklistItem>;
  addContactWithEmptyCellphone: VoidWithArg<ContactItemWithEmptyCellphone>;
  addContactWithUserId: VoidWithArg<ContactItem>;
  removeBlock: VoidWithArg<BlacklistItem>;
  removeContact: VoidWithArg<RemoveContactIO["output"]["removedContact"]>;
  reset: VoidNoArgsFn;
  setAddingContactWithCellphone: VoidWithArg<
    Partial<AddingContactWithCellphone>
  >;
  setAddingContactWithUserId: VoidWithArg<Partial<FullName>>;
  setCurrentUserData: VoidWithArg<CurrentUserData>;
  setSelectedUserIdForActions: VoidWithArg<UserId>;
  setUsers: VoidWithArg<Users>;
  updateCurrentUserPublicData: VoidWithArg<UserPublicData>;
  updateCurrentUserAvatarSrc: VoidWithArg<{
    avatarSrc: AvatarSrc;
  }>;
  updateUser: VoidWithArg<Partial<UserItem> & { userId: UserId }>;
  updateOnlineUser: VoidWithArg<OnlineUser>;
  updateOnlineUserList: VoidWithArg<OnlineUserList>;
}

export type UserSetState = StoreSetFn<UserState>;

export type UserStore = UserHandlers & UserState;
