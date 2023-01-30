import InputAdornment from "@mui/material/InputAdornment";
import { stuffStore } from "src/classes/StuffStore";

import DialogTemplate from "src/components/dialog/Template";
import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import { controllers } from "src/controllers";
import { useMainContext } from "src/hooks/useMainContext";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const EditBio = ({ onDialogClose }) => {
  const state = useSelector();
  const dispatch = useDispatch();
  const {
    hooksOutput: { dispatchAsync },
  } = useMainContext();

  const handleInputChange = (event) => {
    dispatch(
      actions.updateProfile({
        profile: { [event.target.name]: event.target.value },
      })
    );
  };

  const handleSaveClick = async () => {
    await dispatchAsync(controllers.updateProfile());
    handleBack();
  };
  const handleClose = () => {
    onDialogClose("editBio");
  };
  const handleBack = () => {
    handleClose();
    dispatch(commonActions.openDialog("editProfile"));
  };

  return (
    <>
      <DialogTemplate
        title={<Title />}
        open={state.global.dialogState.editBio.open}
        content={
          <Content
            bio={state.settings.profile.bio}
            onInputChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <Actions onSaveClick={handleSaveClick} onCancel={handleBack} />
        }
      />
    </>
  );
};

const Title = () => <Box.Div>Edit Bio</Box.Div>;

const Content = ({ bio, onInputChange }) => {
  return (
    <Box.Flex style={{ maxWidth: 400 }} col>
      <Input.Text
        name="bio"
        multiline
        maxRows={3}
        label="Bio"
        onChange={onInputChange}
        value={bio}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {stuffStore.models.bio.maxlength.value - bio.length}
            </InputAdornment>
          ),
        }}
      />
      <GreyTextParagraph>
        any details such as age, occupation or city. Example: 23 y.o. designer
        from San Francisco
      </GreyTextParagraph>
    </Box.Flex>
  );
};

const Actions = ({ onCancel, onSaveClick }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.Button onClick={onSaveClick} variant="text" color="primary">
      Confirm
    </Input.Button>
  </>
);

export default EditBio;
