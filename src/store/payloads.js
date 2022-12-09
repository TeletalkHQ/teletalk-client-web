import { authActionPayloads } from "store/auth/payloads";
import { globalActionPayloads } from "store/global/payloads";
import { messageActionPayloads } from "store/message/payloads";
import { notificationActionPayloads } from "store/notification/payloads";
import { otherActionPayloads } from "store/other/payloads";
import { userActionPayloads } from "store/user/payloads";

const payloads = {
  auth: authActionPayloads,
  global: globalActionPayloads,
  message: messageActionPayloads,
  notification: notificationActionPayloads,
  other: otherActionPayloads,
  user: userActionPayloads,
};

export { payloads };
