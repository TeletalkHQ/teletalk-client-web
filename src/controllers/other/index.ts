import { getAllStuff } from "~/controllers/other/getAllStuff";
import { getCountries } from "~/controllers/other/getCountries";
import { getWelcomeMessage } from "~/controllers/other/getWelcomeMessage";
import { initialSetup } from "~/controllers/other/initialSetup";

const otherControllers = {
  getAllStuff,
  getCountries,
  getWelcomeMessage,
  initialSetup,
};

export { otherControllers };
