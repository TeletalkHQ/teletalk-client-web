import { stuffStore } from "src/classes/StuffStore";
import EditBioComponents from "src/components/dialog/editBio";

import DialogTemplate from "src/components/dialog/Template";
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
        title={<EditBioComponents.Title />}
        open={state.global.dialogState.editBio.open}
        content={
          <EditBioComponents.Content
            bioModelLength={stuffStore.models.bio.maxlength.value}
            bio={state.settings.profile.bio}
            onInputChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <EditBioComponents.Actions
            onSaveClick={handleSaveClick}
            onCancel={handleBack}
          />
        }
      />
    </>
  );
};

export default EditBio;
