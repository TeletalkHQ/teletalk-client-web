import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {}

const Main: React.FC<Props> = (props) => {
  return <Box {...props} />;
};

export default Main;
