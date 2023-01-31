import { userUtilities } from "src/classes/UserUtilities";

import { Box } from "src/components/general/box";
import Header from "./Header";
import List from "./List";

const EditProfileContent = ({ onItemClick, profile }) => {
  const fullName = userUtilities.makeFullName(profile);
  const fullNumber = userUtilities.makeFullNumber(profile);

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
          onItemClick={onItemClick}
        />
      </Box.Flex>
    </>
  );
};

export default EditProfileContent;
