import { useContext } from "react";

import { MainContext } from "contexts/MainContext";

const useMainContext = (context = MainContext) => useContext(context);

export { useMainContext };
