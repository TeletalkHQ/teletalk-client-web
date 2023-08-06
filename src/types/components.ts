import { LoadingButtonProps } from "@mui/lab";
import { SelectChangeEvent, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
  ChangeEvent,
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
} from "react";

import { DialogName } from "./store";

export type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type SpanProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export type VoidNoArgsFn = () => void;

export type CommonOnClose = VoidNoArgsFn;

export type CommonOnChange = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export type CommonSelectChangeEvent = SelectChangeEvent<unknown>;

export type CommonSelectOnChange = (e: CommonSelectChangeEvent) => void;

export type CommonChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type OnChangeValidatorFn = (value: any, e: CommonChangeEvent) => void;

export type HTMLProps = HTMLAttributes<HTMLLIElement>;

export type ElementName =
  | "account"
  | "addContacts"
  | "allChats"
  | "attachFile"
  | "back"
  | "bio"
  | "bot"
  | "calls"
  | "channels"
  | "check"
  | "close"
  | "contacts"
  | "countryCode"
  | "countryName"
  | "editChats"
  | "emojiEmotions"
  | "firstName"
  | "groups"
  | "lastName"
  | "lock"
  | "logout"
  | "menu"
  | "messageBox"
  | "micNone"
  | "more"
  | "newChannel"
  | "newGroup"
  | "nightMode"
  | "personal"
  | "phoneNumber"
  | "search"
  | "settings"
  | "telegram"
  | "unread"
  | "username"
  | "verificationCode";

export type ElementLabel =
  | "Bio"
  | "Choose a country"
  | "Code"
  | "Create"
  | "Creating..."
  | "First Name"
  | "Last Name"
  | "Url"
  | "Name"
  | "Next"
  | "Phone Number"
  | "Sign in..."
  | "Username"
  | "Verify"
  | "Verifying..."
  | "Verification Code";

export type ElementId = ElementName;

export type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export type HTMLDivMouseEvent = MouseEvent<
  HTMLDivElement,
  globalThis.MouseEvent
>;

export type OnDialogClose = (n: DialogName) => void;

export interface CustomLoadingButtonProps extends LoadingButtonProps {
  loadingIndicatorText?: string;
}
