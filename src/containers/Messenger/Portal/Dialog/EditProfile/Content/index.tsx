import { userUtils } from "~/classes/UserUtils";
import { Box } from "~/components";
import { Profile } from "~/types";

import { EditProfileListItemOnClick } from "../types";
import Header from "./Header";
import List from "./List";

interface Props {
  onClick: EditProfileListItemOnClick;
  profile: Profile;
}

const Content: React.FC<Props> = ({ onClick, profile }) => {
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

export default Content;
