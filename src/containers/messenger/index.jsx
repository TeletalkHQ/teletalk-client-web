import GridContainer from "components/general/box/GridContainer";

import LeftSide from "containers/leftSide";
import RightSide from "containers/rightSide";

const Messenger = () => {
  return (
    <GridContainer style={{ height: "100vh" }}>
      <LeftSide />
      <RightSide />
    </GridContainer>
  );
};

export default Messenger;
