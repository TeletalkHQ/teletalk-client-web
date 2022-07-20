const PropCheck = ({ children, childrenProps }) => {
  console.log(childrenProps);

  return children(childrenProps);
};

export default PropCheck;
