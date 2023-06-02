import Div from "~/components/general/box/Div";

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
