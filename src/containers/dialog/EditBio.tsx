import { stuffStore } from "~/classes/StuffStore";
import EditBioComponents from "~/components/dialog/editBio";

import DialogTemplate from "~/components/dialog/Template";
import { controllers } from "~/controllers";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

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