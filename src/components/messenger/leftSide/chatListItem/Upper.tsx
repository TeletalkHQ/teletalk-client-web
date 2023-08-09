import Box from "~/components/general/box";
import { Typography } from "~/components/general/typography";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

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
      <GreyTextParagraph
        style={{
          fontSize: 12,
        }}
      >
        12:38
      </GreyTextParagraph>
    </Box.Div>
  </Box.Flex>
);

export default Upper;
