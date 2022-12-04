import { ioFieldMaker } from "utility-store/src/classes/IoFieldMaker";

import { variables } from "variables";

const statics = {
  array: (value) =>
    ioFieldMaker
      .create()
      .type(variables.other.dataTypes.ARRAY)
      .value([value])
      .build(),
  boolean: ioFieldMaker
    .create()
    .type(variables.other.dataTypes.BOOLEAN)
    .build(),
  number: ioFieldMaker.create().type(variables.other.dataTypes.NUMBER).build(),
  object: (value) =>
    ioFieldMaker
      .create()
      .type(variables.other.dataTypes.OBJECT)
      .value(value)
      .build(),
  string: ioFieldMaker.create().type(variables.other.dataTypes.STRING).build(),
};

const authenticationProgress = statics.boolean;
const bio = statics.string;
const chatId = statics.string;
const countryCode = statics.string;
const countryName = statics.string;
const countryShortName = statics.string;
const description = statics.string;
const dialogName = statics.string;
const errorCode = statics.string;
const errorReason = statics.string;
const firstName = statics.string;
const isOnline = statics.boolean;
const lastName = statics.string;
const message = statics.string;
const messageId = statics.string;
const messageInputTextValue = statics.string;
const open = statics.boolean;
const participantId = statics.string;
const phoneNumber = statics.string;
const ping = statics.number;
const senderId = statics.string;
const status = statics.string;
const userId = statics.string;
const username = statics.string;
const verificationCode = statics.string;
const viewMode = statics.string;
const welcomeMessage = statics.string;
const zIndex = statics.number;

const country = {
  countryCode,
  countryName,
  countryShortName,
};

const contact = {
  countryCode,
  countryName,
  firstName,
  lastName,
  phoneNumber,
  userId,
};

const selectedCountry = statics.object(country);
const dialogProps = statics.object({ zIndex });

const dialog = {
  dialogName,
  open,
  props: dialogProps,
};

const messageSender = statics.object({
  senderId,
});

const messageItem = {
  message,
  messageId,
  messageSender,
};

const notification = {
  description,
  errorCode,
  errorReason,
  message,
};

const participantItem = {
  participantId,
};

const blacklist = statics.array(contact);
const contacts = statics.array(contact);
const countries = statics.array(country);
const messages = statics.array(messageItem);
const newContact = statics.object(contact);
const participants = statics.array(participantItem);

const single = {
  bio,
  chatId,
  countryCode,
  countryName,
  countryShortName,
  description,
  dialogName,
  errorCode,
  errorReason,
  firstName,
  isOnline,
  lastName,
  message,
  messageId,
  messageInputTextValue,
  open,
  phoneNumber,
  ping,
  senderId,
  status,
  userId,
  username,
  verificationCode,
  viewMode,
  welcomeMessage,
  zIndex,
};

const collection = {
  authenticationProgress,
  blacklist,
  contact,
  contacts,
  countries,
  country,
  dialog,
  dialogProps,
  messageItem,
  messages,
  messageSender,
  newContact,
  notification,
  participants,
  selectedCountry,
};

const fields = {
  collection,
  single,
  statics,
};

export { fields };
