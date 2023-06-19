import { ioFieldMaker } from "check-fields";

import { variables } from "~/variables";

const statics = {
  array: (value) =>
    ioFieldMaker()
      .type(variables.common.DATA_TYPES.ARRAY)
      .value([value])
      .build(),
  boolean: ioFieldMaker().type(variables.common.DATA_TYPES.BOOLEAN).build(),
  number: ioFieldMaker().type(variables.common.DATA_TYPES.NUMBER).build(),
  object: (value) =>
    ioFieldMaker()
      .type(variables.common.DATA_TYPES.OBJECT)
      .value(value)
      .build(),
  string: ioFieldMaker().type(variables.common.DATA_TYPES.STRING).build(),
};

const authenticationProgress = statics.boolean;
const bio = statics.string;
const chatId = statics.string;
const chatType = statics.string;
const countryCode = statics.string;
const countryName = statics.string;
const countryShortName = statics.string;
const createdAt = statics.number;
const description = statics.string;
const dialogName = statics.string;
const errorCode = statics.number;
const errorReason = statics.string;
const firstName = statics.string;
const id = statics.string;
const isOnline = statics.boolean;
const isStuffImported = statics.boolean;
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
const participants = statics.array(participantItem);
const newContact = statics.object(contact);

const privateChatItem = {
  chatId,
  createdAt,
  messages,
  participants,
};

const privateChat = statics.object(privateChatItem);

const single = {
  bio,
  chatId,
  chatType,
  countryCode,
  countryName,
  countryShortName,
  createdAt,
  description,
  dialogName,
  errorCode,
  errorReason,
  firstName,
  id,
  isOnline,
  isStuffImported,
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
  blacklist,
  cellphone,
  contact,
  contacts,
  countries,
  country,
  dialog,
  dialogProps,
  fullName,
  messageItem,
  messages,
  newContact,
  notification,
  participants,
  privateChat,
  privateChatItem,
  selectedCountry,
  sender,
};

const fields = {
  collection,
  single,
  statics,
};

export { fields };
