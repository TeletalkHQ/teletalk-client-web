import { CSSProperties } from "react";

import { FullName } from "utility-store/lib/types";
import { Transitions } from "~/components/other/Transitions";

import { countries } from "~/data/countries";

export type CountryItem = (typeof countries)[number];
export type CountryName = CountryItem["countryName"];
export type CountryCode = CountryItem["countryCode"];
export type CountryShortName = CountryItem["countryShortName"];

export interface Contact extends FullName {
  userId: string;
}

export interface Cellphone {
  countryCode: CountryCode;
  countryName: CountryName;
  phoneNumber: string;
}

export type AppDrawerAnchor = "botton" | "left" | "right" | "top";

export type TransitionName = keyof typeof Transitions;

export interface UiConfig {
  appDrawerCurrentAnchor: AppDrawerAnchor;
  dialogDefaultTransition: TransitionName;
  maxNotification: number;
}

export type Style = CSSProperties;

export type FullContact = Contact & Cellphone;

export type VoidNoArgsFn = () => void;

export * from "~/types/components";
