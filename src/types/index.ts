import { IoFields } from "check-fields";
import {
  AsyncCheckFunction,
  SyncCheckFunction,
  ValidationError,
} from "fastest-validator";
import { CSSProperties } from "react";
import { Cellphone, ContactItem } from "utility-store/lib/types";

import { Transitions } from "~/components/other/Transitions";
import { stuff } from "~/data/stuff";

import { DrawerAnchor } from "./store/global";

export interface StringMap {
  [prop: string]: any;
}

export type TransitionName = keyof typeof Transitions;

export interface UiConfig {
  drawerDefaultAnchor: DrawerAnchor;
  dialogDefaultTransition: TransitionName;
  maxNotification: number;
}

export type Contacts = ContactItem[];

export type Style = CSSProperties;

export type FullContact = ContactItem & Cellphone;

export type VoidNoArgsFn = () => void;

export * from "~/types/components";

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

export type Events = typeof stuff.events;
export type EventName = Events[number]["name"];

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

export type ErrorSide = "server" | "client";

export interface NativeError {
  description?: string;
  isAuthError: boolean;
  message?: string;
  reason: ErrorReason;
  side: ErrorSide;
}

export type Notification = NativeError;

export interface Environments {
  NEXT_PUBLIC_CLIENT_BASE_URL: string;
  NEXT_PUBLIC_SERVER_BASE_URL: string;
  NEXT_PUBLIC_PRODUCTION_CLIENT_BASE_URL: string;
  NEXT_PUBLIC_RUNTIME_MODE: "development" | "production";
}

export type EnvName = keyof Environments;

export type RuntimeMode = Environments["NEXT_PUBLIC_RUNTIME_MODE"];

export type Stuff = typeof stuff;

export type Field = keyof typeof stuff.models;

export type FieldType = (typeof stuff.models)[Field]["type"];

export interface NativeModel {
  defaultValue?: any;
  empty?: boolean;
  length?: number;
  maxLength?: number;
  minLength?: number;
  numeric?: boolean;
  required?: boolean;
  trim?: boolean;
  type: FieldType;
  unique?: boolean;
}

export type NativeModelKey = keyof NativeModel;

export type * from "./api";
export type * from "./store";
export type * from "./models";
export type * from "./components";
export type * from "./utils";
export type * from "./datatypes";
