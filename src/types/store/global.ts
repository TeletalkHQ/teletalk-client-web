import { CircularProgressProps } from "@mui/material";
import { CSSProperties } from "react";
import { CountryItem } from "utility-store/lib/types";

import { dialogNames } from "~/store/global/initialState";
import {
  StoreSetFn,
  VoidNoArgsFn,
  VoidWithArg,
  VoidWithTwoArgs,
} from "~/types";

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

export type OnContextMenu = VoidWithArg<React.MouseEvent>;

export type ExtendedOnContextMenu<T extends any = any> = VoidWithTwoArgs<
  React.MouseEvent,
  T
>;

type ContextMenuText = "Edit" | "Remove" | "Block" | "Unblock";

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
  changeDrawerOpen: VoidWithArg<boolean>;
  closeContextMenu: VoidNoArgsFn;
  closeDialog: (dialogName: DialogName, props?: DialogProps) => void;
  closeFullPageLoading: VoidNoArgsFn;
  closeLoading: VoidWithArg<LoadingType>;
  closeOverlayLoading: VoidNoArgsFn;
  handleContextMenu: VoidWithTwoArgs<React.MouseEvent, ContextMenuList>;
  openDialog: (dialogName: DialogName, props?: DialogProps) => void;
  openFullPageLoading: VoidNoArgsFn;
  openLoading: VoidWithArg<LoadingType>;
  openOverlayLoading: VoidNoArgsFn;
  updateContextMenuList: VoidWithArg<ContextMenuList>;
  updateOnlineStatus: VoidWithArg<boolean>;
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
