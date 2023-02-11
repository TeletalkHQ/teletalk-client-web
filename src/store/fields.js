import { ioFieldMaker } from "utility-store/src/classes/IoFieldMaker";

import { variables } from "src/variables";

const statics = {
  array: (value) =>
    ioFieldMaker
      .create()
      .type(variables.common.DATA_TYPES.ARRAY)
      .value([value])
      .build(),
  boolean: ioFieldMaker
    .create()
    .type(variables.common.DATA_TYPES.BOOLEAN)
    .build(),
  number: ioFieldMaker
    .create()
    .type(variables.common.DATA_TYPES.NUMBER)
    .build(),
  object: (value) =>
    ioFieldMaker
      .create()
      .type(variables.common.DATA_TYPES.OBJECT)
      .value(value)
      .build(),
  string: ioFieldMaker
    .create()
    .type(variables.common.DATA_TYPES.STRING)
    .build(),
};

const authenticationProgress = statics.boolean;
const bio = statics.string;
const chatId = statics.string;
const countryCode = statics.string;
const countryName = statics.string;
const countryShortName = statics.string;
const createdAt = statics.number;
const description = statics.string;
const dialogName = statics.string;
const errorCode = statics.number;
const errorReason = statics.string;
const firstName = statics.string;
const isOnline = statics.boolean;
const lastName = statics.string;
const message = statics.string;
const messageId = statics.string;
const messageInputTextValue = statics.string;
const online = statics.boolean;
const open = statics.boolean;
const participantId = statics.string;
const phoneNumber = statics.string;
const ping = statics.number;
const senderId = statics.string;
const status = statics.string;
const type = statics.string;
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

const cellphone = { countryCode, countryName, phoneNumber };
const fullName = { firstName, lastName };
const contact = {
  ...cellphone,
  ...fullName,
  userId,
};

const selectedCountry = statics.object(country);
const dialogProps = statics.object({ zIndex });

const dialog = {
  dialogName,
  open,
  props: dialogProps,
};

const sender = statics.object({
  senderId,
});

const messageItem = {
  createdAt,
  message,
  messageId,
  sender,
};

const notification = {
  description,
  errorCode,
  errorReason,
  message,
  type,
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
  createdAt,
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
  online,
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
  fullName,
  blacklist,
  cellphone,
  contact,
  contacts,
  countries,
  country,
  dialog,
  dialogProps,
  messageItem,
  messages,
  newContact,
  notification,
  participants,
  selectedCountry,
  sender,
};

const fields = {
  collection,
  single,
  statics,
};

export { fields };
