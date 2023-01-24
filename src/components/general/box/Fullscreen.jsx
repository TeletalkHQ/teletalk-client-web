import Div from "src/components/general/box/Div";

const Fullscreen = ({ style = {}, ...rest }) => {
  return (
    <Div
      style={{
        ...style,
        height: "100vh",
        width: "100vw",
      }}
      {...rest}
    />
  );
};

export default Fullscreen;
