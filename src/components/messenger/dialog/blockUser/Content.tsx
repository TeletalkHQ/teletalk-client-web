import Box from "~/components/general/box";
import { Typography } from "~/components/general/typography";

interface Props {
  fullName: string;
}

const BlockUserContent: React.FC<Props> = ({ fullName }) => (
  <>
    <Box.Div style={{ textAlign: "center", fontSize: 18 }}>
      <Box.Span>Are you sure you want to</Box.Span>{" "}
      <Typography.Bold>block</Typography.Bold> <Box.Span>user</Box.Span>{" "}
      <Typography.Bold>{fullName}</Typography.Bold>
      <Box.Span>?</Box.Span>
    </Box.Div>
  </>
);

export default BlockUserContent;
