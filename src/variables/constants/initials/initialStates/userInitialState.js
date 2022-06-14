import { userInitializer } from "functions/helpers/userInitializer";

const userInitialState = {
  ...userInitializer(),
};
export { userInitialState };
