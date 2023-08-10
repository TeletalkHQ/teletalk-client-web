import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import { Typography } from "~/components/general/typography";

interface Props {
  fullName: string;
}

const Header: React.FC<Props> = ({ fullName }) => (
  <Box.Flex col gap={1} jc="center" ai="center">
    <Avatar style={{ width: "100px", height: "100px" }} />
    <Typography.Bold style={{ fontSize: 20 }}>{fullName}</Typography.Bold>
  </Box.Flex>
);

export default Header;
