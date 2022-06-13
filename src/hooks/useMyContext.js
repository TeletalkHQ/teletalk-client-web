import { useContext } from "react";

import { MainContext } from "~/contexts/MainContext";

const initialContext = MainContext;

const useMyContext = (context = initialContext) => useContext(context);

export { useMyContext };
