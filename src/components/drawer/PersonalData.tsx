import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";

interface Props {
  fullNumber: string;
  fullName: string;
}

const PersonalData: React.FC<Props> = ({ fullNumber, fullName }) => (
  <Box.Flex col ai="center" jc="center" style={{ padding: 10 }} gap={1}>
    <Box.Div>
      <Avatar />
    </Box.Div>
    <Box.Div style={{ fontWeight: "bold", fontSize: 18 }}>{fullName}</Box.Div>
    <Box.Div style={{ fontSize: 14 }}>{fullNumber}</Box.Div>
  </Box.Flex>
);

export default PersonalData;
