import { IoFields } from "check-fields";
import { CSSProperties } from "react";

import { FullName } from "utility-store/lib/types";
import { Transitions } from "~/components/other/Transitions";

import { countries } from "~/data/countries";
import { stuff } from "~/data/stuff";

export type CountryItem = (typeof countries)[number];
export type CountryName = CountryItem["countryName"];
export type CountryCode = CountryItem["countryCode"];
export type CountryShortName = CountryItem["countryShortName"];

export interface StringMap {
  [prop: string]: any;
}

export interface Contact extends FullName {
  userId: string;
}

export type GlobalLoadingType = "FULL_PAGE" | "OVERLAY";

export interface LoadingState {
  color: "blue";
  open: false;
  progressColor: "inherit";
  size: number;
  speedMultiplier: number;
  type: GlobalLoadingType;
}

export interface Cellphone {
  countryCode: CountryCode;
  countryName: CountryName;
  phoneNumber: string;
}

export type AppDrawerAnchor = "bottom" | "left" | "right" | "top";

export type TransitionName = keyof typeof Transitions;

export interface UiConfig {
  appDrawerCurrentAnchor: AppDrawerAnchor;
  dialogDefaultTransition: TransitionName;
  maxNotification: number;
}

export type Contacts = Contact[];

export type Style = CSSProperties;

export type FullContact = Contact & Cellphone;

export type VoidNoArgsFn = () => void;

export * from "~/types/components";

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export type EventName =
  (typeof stuff.routes)[keyof typeof stuff.routes]["name"];

export interface SocketRoute extends Route {
  name: EventName;
}

type ErrorReason = string;

export interface NativeError {
  description?: string;
  code: number;
  message?: string;
  reason: ErrorReason;
}

export type Notification = NativeError;

export interface SocketResponseErrors {
  [prop: string]: NativeError & StringMap;
}

export interface SocketResponse<Data = StringMap> {
  data: Data;
  errors?: SocketResponseErrors;
  ok: boolean;
}

export type RequestData = StringMap;

export type Data = StringMap;

export type ResponseData = StringMap;

export type ResponseCallback = (response: SocketResponse) => Promise<void>;

export type RequestTransformer = (requestData: RequestData) => RequestData;

export type ResponseTransformer = (response: SocketResponse) => SocketResponse;

export type Interceptor = (data: Data) => Data;

export type Interceptors = Interceptor[];
