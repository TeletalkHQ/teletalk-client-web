import { Box, Typography } from "~/components";

interface Props {
  fullName: string;
}

const Upper: React.FC<Props> = ({ fullName }) => (
  <Box.Flex
    style={{
      width: "100%",
    }}
    jc="space-between"
    ai="center"
  >
    <Typography.Bold>{fullName}</Typography.Bold>
    <Box.Div>
      <Typography.GreyTextParagraph
        style={{
          fontSize: 12,
        }}
      >
        12:38
      </Typography.GreyTextParagraph>
    </Box.Div>
  </Box.Flex>
);

export default Upper;
