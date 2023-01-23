import { create } from "src/controllers/auth/create";
import { logout } from "src/controllers/auth/logout";
import { signIn } from "src/controllers/auth/signIn";
import { verify } from "src/controllers/auth/verify";

const authControllers = {
  create,
  logout,
  signIn,
  verify,
};

export { authControllers };
