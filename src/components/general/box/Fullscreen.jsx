import React from "react";

import Div from "src/components/general/box/Div";

const Fullscreen = ({ style = {}, ...props }) => {
  return (
    <Div
      style={{
        ...style,
        height: "100vh",
        width: "100vw",
      }}
      {...props}
    />
  );
};

export default Fullscreen;
