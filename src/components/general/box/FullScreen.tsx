import { CSSProperties } from "react";

import Div from "~/components/general/box/Div";

import { DivProps } from "~/types";

interface Props extends DivProps {
  overrideStyle?: CSSProperties;
}

const FullScreen: React.FC<Props> = ({ overrideStyle = {}, ...rest }) => {
  return (
    <Div
      style={{
        ...overrideStyle,
        height: "100vh",
        width: "100vw",
      }}
      {...rest}
    />
  );
};

export default FullScreen;
