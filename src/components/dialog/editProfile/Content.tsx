import { userUtils } from "~/classes/UserUtils";
import Header from "~/components/dialog/editProfile/Header";
import List from "~/components/dialog/editProfile/List";
import {
  EditProfileListItemOnClick,
  Profile,
} from "~/components/dialog/editProfile/types";
import Box from "~/components/general/box";

interface Props {
  onClick: EditProfileListItemOnClick;
  profile: Profile;
}

const EditProfileContent: React.FC<Props> = ({ onClick, profile }) => {
  const fullName = userUtils.concatFirstNameWithLastName(profile);
  const fullNumber = userUtils.concatCountryCodeWithPhoneNumber(profile);

  return (
    <>
      <Box.Flex
        gap={1}
        col
        jc="center"
        style={{ maxWidth: "400px" }}
        ai="center"
      >
        <Header fullName={fullName} />

        <List
          bio={profile.bio}
          fullName={fullName}
          fullNumber={fullNumber}
          username={profile.username}
          onClick={onClick}
        />
      </Box.Flex>
    </>
  );
};

export default EditProfileContent;
