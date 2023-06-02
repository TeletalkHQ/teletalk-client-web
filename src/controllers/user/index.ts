import { addContact } from "~/controllers/user/addContact";
import { getContacts } from "~/controllers/user/getContacts";
import { getCurrentUserData } from "~/controllers/user/getCurrentUserData";
import { getPublicUserData } from "~/controllers/user/getPublicUserData";
import { updateProfile } from "~/controllers/user/updateProfile";

const userControllers = {
  addContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
  updateProfile,
};

export { userControllers };
