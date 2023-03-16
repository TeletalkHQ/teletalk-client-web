import { createNewUser } from "src/controllers/auth/createNewUser";
import { logout } from "src/controllers/auth/logout";
import { signIn } from "src/controllers/auth/signIn";
import { verify } from "src/controllers/auth/verify";

const authControllers = {
  createNewUser,
  logout,
  signIn,
  verify,
};

export { authControllers };
