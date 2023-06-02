import { getPrivateChats } from "~/controllers/privateChat/getPrivateChats";
import { newPrivateChatMessage } from "~/controllers/privateChat/newPrivateChatMessage";
import { sendPrivateMessage } from "~/controllers/privateChat/sendPrivateMessage";

const privateChatControllers = {
  getPrivateChats,
  newPrivateChatMessage,
  sendPrivateMessage,
};

export { privateChatControllers };
