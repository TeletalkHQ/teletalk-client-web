import { Box } from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";

const Header = ({ fullName }) => (
  <Box.Flex col gap={1} jc="center" ai="center">
    <Avatar style={{ width: "100px", height: "100px" }} />
    <Box.Div style={{ fontWeight: "500", fontSize: 20 }}>{fullName}</Box.Div>
  </Box.Flex>
);

export default Header;
