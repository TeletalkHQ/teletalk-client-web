import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import { Typography } from "~/components/general/typography";

interface Props {
  fullName: string;
  fullNumber: string;
}

const UserInfoContent: React.FC<Props> = ({ fullName, fullNumber }) => {
  return (
    <Box.Flex ai="center" gap={2}>
      <Box.Div>
        <Avatar
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
    </Box.Flex>
  );
};

export default UserInfoContent;
