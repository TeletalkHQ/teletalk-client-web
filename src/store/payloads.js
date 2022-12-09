import { authActionPayloads } from "src/store/auth/payloads";
import { globalActionPayloads } from "src/store/global/payloads";
import { messageActionPayloads } from "src/store/message/payloads";
import { notificationActionPayloads } from "src/store/notification/payloads";
import { otherActionPayloads } from "src/store/other/payloads";
import { userActionPayloads } from "src/store/user/payloads";

const payloads = {
  auth: authActionPayloads,
  global: globalActionPayloads,
  message: messageActionPayloads,
  notification: notificationActionPayloads,
  other: otherActionPayloads,
  user: userActionPayloads,
};

export { payloads };
