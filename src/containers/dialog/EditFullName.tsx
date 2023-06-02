import DialogTemplate from "~/components/dialog/Template";
import EditFullNameComponents from "~/components/dialog/editFullName";

import { controllers } from "~/controllers";

import { useDispatch, useSelector } from "react-redux";

import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

const EditFullName = ({ onDialogClose }) => {
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
    onDialogClose("editFullName");
  };
  const handleBack = () => {
    handleClose();
    dispatch(commonActions.openDialog("editProfile"));
  };

  return (
    <>
      <DialogTemplate
        title={<EditFullNameComponents.Title />}
        open={state.global.dialogState.editFullName.open}
        content={
          <EditFullNameComponents.Content
            fullName={state.settings.profile}
            onInputChange={handleInputChange}
          />
        }
        onClose={handleClose}
        actions={
          <EditFullNameComponents.Actions
            onSaveClick={handleSaveClick}
            onCancel={handleBack}
          />
        }
      />
    </>
  );
};

export default EditFullName;
