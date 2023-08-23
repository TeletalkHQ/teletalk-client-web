import { Box, Typography } from "~/components";

interface Props {
  fullName: string;
}

const Header: React.FC<Props> = ({ fullName }) => (
  <Box.Flex col gap={1} jc="center" ai="center">
    <Box.Avatar style={{ width: "100px", height: "100px" }} />
    <Typography.Bold style={{ fontSize: 20 }}>{fullName}</Typography.Bold>
  </Box.Flex>
);

export default Header;
