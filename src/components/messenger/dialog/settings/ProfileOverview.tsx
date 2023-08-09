import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";
import { Typography } from "~/components/general/typography";
import GreyTextParagraph from "~/components/general/typography/GreyTextParagraph";

interface Props {
  fullName: string;
  fullNumber: string;
  username: string;
}

const SettingsProfileOverview: React.FC<Props> = ({
  fullName,
  fullNumber,
  username,
}) => {
  return (
    <Box.Flex ai="center" gap={2}>
      <Box.Div>
        <Avatar style={{ width: 80, height: 80 }} />
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
            <GreyTextParagraph>@{username}</GreyTextParagraph>
          </Box.Div>
        )}
      </Box.Flex>
    </Box.Flex>
  );
};

export default SettingsProfileOverview;
