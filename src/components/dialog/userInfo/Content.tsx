import Box from "~/components/general/box";
import Avatar from "~/components/general/other/Avatar";

interface Props {
  fullName: string;
  fullNumber: string;
}

const UserInfoContent: React.FC<Props> = ({ fullName, fullNumber }) => {
  return (
    <Box.Flex ai="center" gap={2}>
      <Box.Div>
        <Avatar style={{ width: 80, height: 80 }} />
      </Box.Div>

      <Box.Flex col>
        <Box.Div
          style={{
            fontSize: 20,
            fontWeight: "500",
          }}
        >
          {fullName}
        </Box.Div>

        <Box.Div
          style={{
            fontSize: 14,
            fontWeight: "400",
          }}
        >
          {fullNumber}
        </Box.Div>
      </Box.Flex>
    </Box.Flex>
  );
};

export default UserInfoContent;
