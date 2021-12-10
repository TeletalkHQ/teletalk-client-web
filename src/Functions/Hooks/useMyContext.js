const { useContext } = require("react");

const { MainContext } = require("~/Functions/Others/Contexts/Contexts");

const initialContext = MainContext;

const useMyContext = (context = initialContext) => useContext(context);

export { useMyContext };
