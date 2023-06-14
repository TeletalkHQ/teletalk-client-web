import {
  ChangeEvent,
  ChangeEventHandler,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEvent,
} from "react";

import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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

export type CommonChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type HTMLProps = HTMLAttributes<HTMLLIElement>;

export type ElementName =
  | "account"
  | "bio"
  | "addContacts"
  | "allChats"
  | "attachFile"
  | "back"
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
  | "First Name"
  | "Last Name"
  | "Name"
  | "Next"
  | "Verify"
  | "Verifying..."
  | "Phone Number"
  | "Username"
  | "Sign in..."
  | "Verification Code";

export type ListItemName =
  | "editBio"
  | "editFullName"
  | "editPhoneNumber"
  | "editUsername";

export type ElementId = ElementName;

export type ValidatorName =
  | "countryCode"
  | "countryName"
  | "firstName"
  | "lastName"
  | "phoneNumber"
  | "verificationCode";

export type IconType = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export type HTMLDivMouseEvent = MouseEvent<
  HTMLDivElement,
  globalThis.MouseEvent
>;
