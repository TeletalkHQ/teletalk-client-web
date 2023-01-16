import { getCountries } from "src/controllers/other/getCountries";
import { getWelcomeMessage } from "src/controllers/other/getWelcomeMessage";
import { initialSetup } from "src/controllers/other/initialSetup";

const otherControllers = {
  getCountries,
  getWelcomeMessage,
  initialSetup,
};

export { otherControllers };
