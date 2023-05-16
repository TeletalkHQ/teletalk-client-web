const PropCheck = ({ children, childrenProps }) => {
  logger.debug(childrenProps);

  return children(childrenProps);
};

export default PropCheck;
