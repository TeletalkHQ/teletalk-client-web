import { Box, Typography } from "~/components";

interface Props {
  fullName: string;
  fullNumber: string;
  username: string;
}

const ProfileOverview: React.FC<Props> = ({
  fullName,
  fullNumber,
  username,
}) => {
  return (
    <Box.Flex ai="center" gap={2}>
      <Box.Div>
        <Box.Avatar style={{ width: 80, height: 80 }} />
      </Box.Div>

      <Box.Flex col>
        <Typography.Bold
          style={{
            fontSize: 20,
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

        {username && (
          <Box.Div
            style={{
              fontSize: 16,
            }}
          >
            <Typography.GreyTextParagraph>
              @{username}
            </Typography.GreyTextParagraph>
          </Box.Div>
        )}
      </Box.Flex>
    </Box.Flex>
  );
};

export default ProfileOverview;
