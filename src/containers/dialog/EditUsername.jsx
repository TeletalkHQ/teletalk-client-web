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

const EditUsername = ({ onDialogClose }) => {
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
    onDialogClose("editUsername");
  };
  const handleBack = () => {
    handleClose();
    dispatch(commonActions.openDialog("editProfile"));
  };

  return (
    <>
      <DialogTemplate
        title={<Title />}
        open={state.global.dialogState.editUsername.open}
        content={
          <Content
            username={state.settings.profile.username}
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

const Title = () => <Box.Div>Edit Username</Box.Div>;

const Content = ({ username, onInputChange }) => {
  return (
    <Box.Flex style={{ maxWidth: 400 }} col>
      <Input.Text
        name="username"
        label="Username"
        onChange={onInputChange}
        value={username}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
      <GreyTextParagraph>
        You can choose a username on Teletalk. If you do, other people will be
        able to find you by this username and contact you without knowing your
        phone number. You can use a-z, 0-9 and underscores. Minimum length is{" "}
        {stuffStore.models.username.minlength.value} characters.
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

export default EditUsername;
