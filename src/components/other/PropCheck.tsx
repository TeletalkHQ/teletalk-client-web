import React from "react";

interface Props {
  children: React.FC;
  childrenProps: object;
}

const PropCheck: React.FC<Props> = ({ children, childrenProps }) => {
  logger.debug(childrenProps);

  return children(childrenProps);
};

export default PropCheck;
