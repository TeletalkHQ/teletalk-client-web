import { getPrivateChats } from "src/controllers/privateChat/getPrivateChats";
import { sendPrivateMessage } from "src/controllers/privateChat/sendPrivateMessage";

const privateChatControllers = {
  getPrivateChats,
  sendPrivateMessage,
};

export { privateChatControllers };
