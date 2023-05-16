import { addContact } from "src/controllers/user/addContact";
import { getContacts } from "src/controllers/user/getContacts";
import { getCurrentUserData } from "src/controllers/user/getCurrentUserData";
import { getPublicUserData } from "src/controllers/user/getPublicUserData";
import { updateProfile } from "src/controllers/user/updateProfile";

const userControllers = {
  addContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
  updateProfile,
};

export { userControllers };
