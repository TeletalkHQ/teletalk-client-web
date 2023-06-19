import { useEffect } from "react";

import { userUtilities } from "~/classes/UserUtilities";
import DialogTemplate from "~/components/dialog/Template";
import EditProfileComponents from "~/components/dialog/editProfile";
import { actions } from "~/store/actions";
import { commonActions } from "~/store/commonActions";

const EditProfile = ({ onDialogClose }) => {
  useEffect(() => {
    if (state.global.dialogState.editProfile.open)
      dispatch(
        actions.updateProfile({
          profile: {
            ...userUtilities.extractCellphone(state.user),
            ...userUtilities.extractFullName(state.user),
            bio: state.user.bio,
            username: state.user.username,
          },
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.global.dialogState.editProfile.open]);

  const handleItemClick = (item) => {
    handleClose();
    dispatch(commonActions.openDialog(item.name, { zIndex: 1500 }));
  };

  const handleInputChange = (event) => {
    dispatch(
      actions.updateProfile({
        profile: { [event.target.name]: event.target.value },
      })
    );
  };

  const handleClose = () => {
    onDialogClose("editProfile");
  };
  const handleCancel = () => {
    handleClose();
    dispatch(commonActions.openDialog("settings"));
  };

  return (
    <>
      <DialogTemplate
        title={<EditProfileComponents.Title />}
        open={state.global.dialogState.editProfile.open}
        content={
          <EditProfileComponents.Content
            profile={state.settings.profile}
            onInputChange={handleInputChange}
            onItemClick={handleItemClick}
          />
        }
        actions={<EditProfileComponents.Actions onCancel={handleCancel} />}
        onClose={handleClose}
      />
    </>
  );
};

export default EditProfile;
