import { getPrivateChats } from "src/controllers/privateChat/getPrivateChats";
import { newPrivateChatMessage } from "src/controllers/privateChat/newPrivateChatMessage";
import { sendPrivateMessage } from "src/controllers/privateChat/sendPrivateMessage";

const privateChatControllers = {
  getPrivateChats,
  newPrivateChatMessage,
  sendPrivateMessage,
};

export { privateChatControllers };
