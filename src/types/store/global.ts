import { CircularProgressProps } from "@mui/material";
import { CSSProperties } from "react";
import { CountryItem } from "utility-store/lib/types";

import { dialogNames } from "~/store/global/initialState";
import { StoreSetFn, VoidNoArgsFn } from "~/types";

export type DrawerAnchor = "bottom" | "left" | "right" | "top";

export type DialogName = (typeof dialogNames)[number];

export interface DialogProps {
  zIndex: number;
}

export interface DialogState {
  open: boolean;
  props: DialogProps;
}

export type EmptyCountryItem = {
  countryCode: "";
  countryName: "";
  countryShortName: "";
};

export type IllegalCountryItem = {
  countryCode: string;
  countryName: string;
  countryShortName: string;
};

export type SelectedCountry = CountryItem | null;

export type WeirdSelectedCountry =
  | EmptyCountryItem
  | IllegalCountryItem
  | Partial<CountryItem>
  | null;

export type LoadingType = "FULL_PAGE" | "OVERLAY";

export type OnContextMenu = (e: React.MouseEvent) => void;

export type ExtendedOnContextMenu<T extends any = any> = (
  e: React.MouseEvent,
  arg: T
) => void;

type ContextMenuText =
  | "Edit Contact"
  | "Remove Contact"
  | "Block Contact"
  | "Remove Block";

export interface ContextMenuItem {
  text: ContextMenuText;
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

export interface GlobalHandlers {
  // updateDialog: (dialogState: DialogState & { dialogName: DialogName }) => void;
  changeDrawerOpen: (o: boolean) => void;
  closeContextMenu: () => void;
  closeDialog: (dialogName: DialogName, props?: DialogProps) => void;
  closeFullPageLoading: VoidNoArgsFn;
  closeLoading: (type?: LoadingType) => void;
  closeOverlayLoading: VoidNoArgsFn;
  handleContextMenu: (e: React.MouseEvent, list: ContextMenuList) => void;
  openDialog: (dialogName: DialogName, props?: DialogProps) => void;
  openFullPageLoading: VoidNoArgsFn;
  openLoading: (type?: LoadingType) => void;
  openOverlayLoading: VoidNoArgsFn;
  updateContextMenuList: (list: ContextMenuList) => void;
  updateOnlineStatus: (isOnline: boolean) => void;
  reset: VoidNoArgsFn;
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
  dialogState: { [key in DialogName]: DialogState };
  drawer: {
    anchor: DrawerAnchor;
    open: boolean;
  };
  isOnline: boolean;
  loading: {
    color: CSSProperties["color"];
    open: boolean;
    progressColor: CircularProgressProps["color"];
    size: 80;
    speedMultiplier: number;
    type: LoadingType;
  };
}

export type GlobalSetState = StoreSetFn<GlobalState>;

export type GlobalStore = GlobalHandlers & GlobalState;
