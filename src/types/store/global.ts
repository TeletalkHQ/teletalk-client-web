import { CircularProgressProps } from "@mui/material";
import { CSSProperties } from "react";
import {
  Cellphone,
  CountryItem,
  FullNameWithUserId,
  PublicUserData,
} from "utility-store/lib/types";

import { EditContactIO, StoreSetFn, VoidNoArgsFn } from "~/types";

export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export type DialogName =
  | "addContact"
  | "addServer"
  | "advanced"
  | "callSettings"
  | "chatSettings"
  | "contacts"
  | "editBio"
  | "editContact"
  | "editContactWithCellphone"
  | "editFullName"
  | "editPhoneNumber"
  | "editProfile"
  | "editProfile"
  | "editUsername"
  | "language"
  | "logout"
  | "notificationsAndSounds"
  | "privacyAndSecurity"
  | "servers"
  | "settings"
  | "userInfo";

export interface DialogProps {
  zIndex: number;
}

export interface DialogState {
  open: boolean;
  props: DialogProps;
}

export type SelectedCountry = CountryItem | null;

export type LoadingType = "FULL_PAGE" | "OVERLAY";

export type OnContextMenu = (e: React.MouseEvent) => void;

export type ExtendedOnContextMenu<T extends any = any> = (
  e: React.MouseEvent,
  arg: T
) => void;

export interface ContextMenuItem {
  text: string;
  handler: (...args: any[]) => void;
}

export type ContextMenuList = ContextMenuItem[];

export type ContextMenuState = {
  position: {
    mouseX: number;
    mouseY: number;
  } | null;
  list: ContextMenuList;
};

export type UserItem = PublicUserData &
  Cellphone & {
    isContact: boolean;
    isPublicDataUpdated: boolean;
  };

export type Users = UserItem[];

export interface GlobalHandlers {
  openLoading: (type?: LoadingType) => void;
  closeLoading: (type?: LoadingType) => void;
  changeDrawerOpen: (o: boolean) => void;
  // updateDialog: (dialogState: DialogState & { dialogName: DialogName }) => void;
  updateOnlineStatus: (isOnline: boolean) => void;
  openDialog: (dialogName: DialogName, props?: DialogProps) => void;
  closeDialog: (dialogName: DialogName, props?: DialogProps) => void;
  openOverlayLoading: VoidNoArgsFn;
  closeOverlayLoading: VoidNoArgsFn;
  openFullPageLoading: VoidNoArgsFn;
  closeFullPageLoading: VoidNoArgsFn;
  handleContextMenu: (e: React.MouseEvent, list: ContextMenuList) => void;
  closeContextMenu: () => void;
  setEditingContact: (c: FullNameWithUserId) => void;
  addUser: (u: UserItem) => void;
  updateUser: (u: EditContactIO["output"]["editedContact"]) => void;
  setUsers: (u: Users) => void;
}

export interface LoadingState {
  color: "blue";
  open: false;
  progressColor: "inherit";
  size: number;
  speedMultiplier: number;
  type: LoadingType;
}

export interface GlobalState {
  contextMenu: ContextMenuState;
  dialogState: {
    addContact: DialogState;
    addServer: DialogState;
    contacts: DialogState;
    editBio: DialogState;
    editContact: DialogState;
    editContactWithCellphone: DialogState;
    editFullName: DialogState;
    editProfile: DialogState;
    editUsername: DialogState;
    logout: DialogState;
    servers: DialogState;
    settings: DialogState;
    userInfo: DialogState;
  };
  drawer: {
    anchor: DrawerAnchor;
    open: boolean;
  };
  editingContact: FullNameWithUserId;
  isOnline: boolean;
  loading: {
    color: CSSProperties["color"];
    open: boolean;
    progressColor: CircularProgressProps["color"];
    size: 80;
    speedMultiplier: number;
    type: LoadingType;
  };

  users: Users;
}

export type GlobalSetState = StoreSetFn<GlobalState>;

export type GlobalStore = GlobalHandlers & GlobalState;
