import { useContext } from "react";

import { MainContext } from "~/Functions/Others/Contexts/MainContext";

const initialContext = MainContext;

const useMyContext = (context = initialContext) => useContext(context);

export { useMyContext };
