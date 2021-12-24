import { useContext } from "react";

import { MainContext } from "~/Contexts/MainContext";

const initialContext = MainContext;

const useMyContext = (context = initialContext) => useContext(context);

export { useMyContext };
