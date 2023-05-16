import { stuffStore } from "src/classes/StuffStore";
import EditBioComponents from "src/components/dialog/editBio";

import DialogTemplate from "src/components/dialog/Template";
import { controllers } from "src/controllers";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "src/store/actions";
import { commonActions } from "src/store/commonActions";

const EditBio = ({ onDialogClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(
      actions.updateProfile({
        profile: { [event.target.name]: event.target.value },
      })
    );
  };

  const handleSaveClick = async () => {
    dispatch(controllers.updateProfile());
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