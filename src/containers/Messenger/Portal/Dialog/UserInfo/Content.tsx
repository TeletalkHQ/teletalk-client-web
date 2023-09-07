import { Box, Typography } from "~/components";

interface Props {
  fullName: string;
  fullNumber: string;
  connectionStatus: string;
}

const Content: React.FC<Props> = ({
  connectionStatus,
  fullName,
  fullNumber,
}) => {
  return (
    <Box.Flex ai="center" gap={2}>
      <Box.Div>
        <Box.Avatar
          style={{
            height: 80,
            width: 80,
          }}
        />
      </Box.Div>

      <Box.Flex col>
        <Typography.Bold
          style={{
            fontSize: 20,
          }}
        >
          {fullName} : {connectionStatus}
        </Typography.Bold>

        <Box.Div
          style={{
            fontSize: 14,
          }}
        >
          {fullNumber}
        </Box.Div>
      </Box.Flex>
    </Box.Flex>
  );
};

export default Content;
