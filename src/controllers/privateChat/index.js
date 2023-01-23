import { getAllPrivateChats } from "src/controllers/privateChat/getAllPrivateChats";
import { sendPrivateMessage } from "src/controllers/privateChat/sendPrivateMessage";

const privateChatControllers = {
  getAllPrivateChats,
  sendPrivateMessage,
};

export { privateChatControllers };
