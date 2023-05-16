import { componentBuilder } from "src/classes/ComponentBuilder";

import { Box } from "src/components/general/box";
import H5 from "src/components/general/typography/header/H5";

const AddNewContactTitle = componentBuilder
  .create()
  .registerComponent("AddNewContactTitle", () => {
    return (
      <>
        <Box.Flex jc="space-between" ai="center">
          <Box.Div>
            <H5>New Contact</H5>
          </Box.Div>
          <Box.Div></Box.Div>
        </Box.Flex>
      </>
    );
  })
  .build();

export default AddNewContactTitle;
