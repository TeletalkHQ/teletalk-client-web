import { authActionPayloads } from "~/store/auth/payloads";
import { globalActionPayloads } from "~/store/global/payloads";
import { messageActionPayloads } from "~/store/message/payloads";
import { notificationActionPayloads } from "~/store/notification/payloads";
import { otherActionPayloads } from "~/store/other/payloads";
import { settingsActionPayload } from "~/store/settings/payloads";
import { userActionPayloads } from "~/store/user/payloads";

const payloads = {
  auth: authActionPayloads,
  global: globalActionPayloads,
  message: messageActionPayloads,
  notification: notificationActionPayloads,
  other: otherActionPayloads,
  settings: settingsActionPayload,
  user: userActionPayloads,
};

export { payloads };
