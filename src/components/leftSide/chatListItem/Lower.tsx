import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";

import Box from "~/components/general/box";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";
import { MessageText } from "~/types";

interface Props {
  messageText: MessageText;
}
const Lower: React.FC<Props> = ({ messageText }) => (
  <Box.Flex jc="space-between" style={{ width: "100%" }} ai="center">
    <GreyTextParagraph>{messageText}</GreyTextParagraph>
    <Box.Div>
      <PushPinTwoToneIcon fontSize="medium" />
    </Box.Div>
  </Box.Flex>
);

export default Lower;
