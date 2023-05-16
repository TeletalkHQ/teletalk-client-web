import { getCountries } from "src/controllers/other/getCountries";
import { getAllStuff } from "src/controllers/other/getAllStuff";
import { getWelcomeMessage } from "src/controllers/other/getWelcomeMessage";
import { initialSetup } from "src/controllers/other/initialSetup";

const otherControllers = {
  getAllStuff,
  getCountries,
  getWelcomeMessage,
  initialSetup,
};

export { otherControllers };
