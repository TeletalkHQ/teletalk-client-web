import DialogTemplate from "src/components/dialog/Template";
import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";
import { CommonInput } from "src/components/general/input/common";

import { controllers } from "src/controllers";

import { useMainContext } from "src/hooks/useMainContext";
import { useDispatch, useSelector } from "src/hooks/useThunkReducer";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const EditFullName = ({ onDialogClose }) => {
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
    onDialogClose("editFullName");
  };
  const handleBack = () => {
    handleClose();
    dispatch(commonActions.openDialog("editProfile"));
  };

  return (
    <>
      <DialogTemplate
        title={<Title />}
        open={state.global.dialogState.editFullName.open}
        content={
          <Content
            fullName={state.settings.profile}
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

const Title = () => <Box.Div>Edit Name</Box.Div>;

const Content = ({ fullName, onInputChange }) => {
  return (
    <Box.Flex col>
      <CommonInput.FullName
        firstName={fullName.firstName}
        lastName={fullName.lastName}
        onFirstNameInputChange={onInputChange}
        onLastNameInputChange={onInputChange}
      />
    </Box.Flex>
  );
};

const Actions = ({ onCancel, onSaveClick }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="error">
      Cancel
    </Input.Button>

    <Input.Button onClick={onSaveClick} variant="text" color="primary">
      Save
    </Input.Button>
  </>
);

export default EditFullName;
