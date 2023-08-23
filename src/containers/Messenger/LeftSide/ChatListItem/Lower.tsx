import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";

import { Box, Typography } from "~/components";
import { MessageText } from "~/types";

interface Props {
  messageText: MessageText;
}
const Lower: React.FC<Props> = ({ messageText }) => (
  <Box.Flex jc="space-between" style={{ width: "100%" }} ai="center">
    <Typography.GreyTextParagraph>{messageText}</Typography.GreyTextParagraph>
    <Box.Div>
      <PushPinTwoToneIcon fontSize="medium" />
    </Box.Div>
  </Box.Flex>
);

export default Lower;
