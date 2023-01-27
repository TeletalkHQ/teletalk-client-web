import { Box } from "src/components/general/box";
import Avatar from "src/components/general/other/Avatar";

const PersonalData = ({ countryCode, firstName, lastName, phoneNumber }) => (
  <Box.Flex col ai="center" jc="center" style={{ padding: 10 }} gap={1}>
    <Box.Div>
      <Avatar />
    </Box.Div>
    <Box.Div style={{ fontWeight: "bold" }}>
      {firstName} {lastName}
    </Box.Div>
    <Box.Div>
      +{countryCode} {phoneNumber}
    </Box.Div>
  </Box.Flex>
);

export default PersonalData;
