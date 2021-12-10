const { createContext } = require("react");
const { INITIAL_STATE } = require("~/Variables/constants/initialState");

const MainContext = createContext({ state: INITIAL_STATE });

export { MainContext };
