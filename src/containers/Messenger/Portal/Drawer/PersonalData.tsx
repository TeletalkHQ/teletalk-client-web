import { Box, Typography } from "~/components";

interface Props {
  fullNumber: string;
  fullName: string;
}

const PersonalData: React.FC<Props> = ({ fullName, fullNumber }) => (
  <Box.Flex
    col
    ai="center"
    jc="center"
    style={{
      padding: 10,
    }}
    gap={1}
  >
    <Box.Div>
      <Box.Avatar />
    </Box.Div>
    <Typography.Bold
      style={{
        fontSize: 18,
      }}
    >
      {fullName}
    </Typography.Bold>
    <Box.Div
      style={{
        fontSize: 14,
      }}
    >
      {fullNumber}
    </Box.Div>
  </Box.Flex>
);

export default PersonalData;
