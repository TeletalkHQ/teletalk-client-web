import { userPropsUtilities } from "classes/UserPropsUtilities";

const userInitialState = {
  ...userPropsUtilities.makeDefaultUserState(),
};
export { userInitialState };
