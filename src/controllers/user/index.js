import { addContact } from "src/controllers/user/addContact";
import { getContacts } from "src/controllers/user/getContacts";
import { getCurrentUserData } from "src/controllers/user/getCurrentUserData";
import { getPublicUserData } from "src/controllers/user/getPublicUserData";

const userControllers = {
  addContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
};

export { userControllers };
