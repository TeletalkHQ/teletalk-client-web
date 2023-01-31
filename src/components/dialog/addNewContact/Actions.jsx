import { componentBuilder } from "src/classes/ComponentBuilder";

import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";

const AddNewContactActions = componentBuilder
  .create()
  .registerComponent(
    "AddNewContactActions",
    ({
      onAddNewContactClick,
      onContactDialogCancelClick,
      isAddNewContactButtonDisabled,
    }) => {
      return (
        <>
          {/* //TODO: Extract to static vars */}
          <Box.Flex gap={1} jc="flex-end" ai="center">
            <Box.Div>
              <Input.Button variant="text" onClick={onContactDialogCancelClick}>
                Cancel
              </Input.Button>
            </Box.Div>
            <Box.Div>
              <Input.Button
                disabled={isAddNewContactButtonDisabled}
                variant="text"
                onClick={onAddNewContactClick}
              >
                Create
              </Input.Button>
            </Box.Div>
          </Box.Flex>
        </>
      );
    }
  )
  .build();

export default AddNewContactActions;
