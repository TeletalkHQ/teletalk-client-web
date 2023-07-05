import Box from "~/components/general/box";
import LeftSide from "~/containers/messenger/leftSide";
import Portal from "~/containers/messenger/portal";
import RightSide from "~/containers/messenger/rightSide";

const Messenger = () => {
  return (
    <Box.Grid
      container
      style={{
        height: "100vh",
      }}
    >
      <Portal />
      <LeftSide />
      <RightSide />
    </Box.Grid>
  );
};

export default Messenger;
