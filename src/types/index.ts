import { IoFields } from "check-fields";
import {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationError,
} from "fastest-validator";
import { CSSProperties } from "react";

import { Transitions } from "~/components/other/Transitions";
import { countries } from "~/data/countries";
import { stuff } from "~/data/stuff";

import { ContactItem, DrawerAnchor, UserItem } from "./store/global";

export type CountryItem = (typeof countries)[number];
export type CountryName = CountryItem["countryName"];
export type CountryCode = CountryItem["countryCode"];
export type CountryShortName = CountryItem["countryShortName"];

export interface StringMap {
  [prop: string]: any;
}

export interface Cellphone {
  countryCode: string;
  countryName: string;
  phoneNumber: string;
}

export type TransitionName = keyof typeof Transitions;

export interface UiConfig {
  drawerDefaultAnchor: DrawerAnchor;
  dialogDefaultTransition: TransitionName;
  maxNotification: number;
}

export type Contacts = UserItem[];

export type Style = CSSProperties;

export type FullContact = ContactItem & Cellphone;

export type VoidNoArgsFn = () => void;

export * from "~/types/components";

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export type EventName =
  (typeof stuff.routes)[keyof typeof stuff.routes]["name"];

export type ValidatorName = keyof typeof stuff.validationModels;

export type ValidatorType = SyncCheckFunction | AsyncCheckFunction;

export type ErrorChecker = (validationResult: any, value: any) => void;

export type ValidationResult =
  | true
  | ValidationError[]
  | Promise<true | ValidationError[]>;

export type ErrorCheckerCollection = {
  [key in ValidatorName]: ErrorChecker;
};

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

export interface Environments {
  NEXT_PUBLIC_CLIENT_BASE_URL: string;
  NEXT_PUBLIC_SERVER_BASE_URL: string;
  NEXT_PUBLIC_PRODUCTION_CLIENT_BASE_URL: string;
  NEXT_PUBLIC_RUNTIME_MODE: "development" | "production";
}

export type EnvName = keyof Environments;

export type RuntimeMode = Environments["NEXT_PUBLIC_RUNTIME_MODE"];

export type Stuff = typeof stuff;

export type Field =
  | "bio"
  | "blacklist"
  | "chatId"
  | "clientId"
  | "clients"
  | "contacts"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
  | "id"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "messageId"
  | "messages"
  | "messageText"
  | "participantId"
  | "participants"
  | "phoneNumber"
  | "privateChats"
  | "senderId"
  | "status"
  | "userId"
  | "username"
  | "verificationCode";

export type FieldType =
  | "array"
  | "boolean"
  | "date"
  | "number"
  | "object"
  | "string";

export interface NativeModel {
  defaultValue: any;
  empty: boolean;
  items: any[];
  length: number;
  maxLength: number;
  minLength: number;
  numeric: boolean;
  required: boolean;
  trim: boolean;
  type: FieldType;
  unique: boolean;
}

export type NativeModelKey = keyof NativeModel;

export type Id = string;

//
//

//
export type * from "./store";
export type * from "./models";
export type * from "./components";
export type * from "./utils";
