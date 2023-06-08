import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";

import Box from "~/components/general/box";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

interface Props {
  message: string;
}
const Lower: React.FC<Props> = ({ message }) => (
  <Box.Flex jc="space-between" style={{ width: "100%" }} ai="center">
    <GreyTextParagraph>{message}</GreyTextParagraph>
    <Box.Div>
      <PushPinTwoToneIcon fontSize="medium" />
    </Box.Div>
  </Box.Flex>
);

export default Lower;
