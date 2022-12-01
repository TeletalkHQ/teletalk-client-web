import { useContext } from "react";

import { MainContext } from "context/MainContext";

const useMainContext = (context = MainContext) => useContext(context);

export { useMainContext };
