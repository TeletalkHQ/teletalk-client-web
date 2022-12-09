import { useContext } from "react";

import { MainContext } from "src/context/MainContext";

const useMainContext = (context = MainContext) => useContext(context);

export { useMainContext };
