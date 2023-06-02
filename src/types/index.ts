import { ChangeEventHandler, HTMLAttributes } from "react";

import { countries } from "~/data/countries";

export type CommonOnChange = ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement
>;

export type CountryItem = (typeof countries)[number];
export type CountryName = CountryItem["countryName"];
export type CountryCode = CountryItem["countryCode"];
export type CountryShortName = CountryItem["countryShortName"];

export type HTMLProps = HTMLAttributes<HTMLLIElement>;

export type ElementName =
  | "account"
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
  | "verificationCode";
