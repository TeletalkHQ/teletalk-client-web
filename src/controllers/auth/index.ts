import { createNewUser } from "~/controllers/auth/createNewUser";
import { logout } from "~/controllers/auth/logout";
import { signIn } from "~/controllers/auth/signIn";
import { verify } from "~/controllers/auth/verify";

const authControllers = {
  createNewUser,
  logout,
  signIn,
  verify,
};

export { authControllers };
