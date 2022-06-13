import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.querySelector("#portalContainer"));
};

export default Portal;
