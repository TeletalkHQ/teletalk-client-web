import Box from "~/components/general/box";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

interface Props {
  fullName: string;
}

const Upper: React.FC<Props> = ({ fullName }) => (
  <Box.Flex style={{ width: "100%" }} jc="space-between" ai="center">
    <Box.Div style={{ fontWeight: "500" }}>{fullName}</Box.Div>
    <Box.Div>
      <GreyTextParagraph style={{ fontSize: 12 }}>12:38</GreyTextParagraph>
    </Box.Div>
  </Box.Flex>
);

export default Upper;
