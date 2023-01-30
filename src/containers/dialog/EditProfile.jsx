import { useEffect } from "react";

import AccountBoxTwoTone from "@mui/icons-material/AccountBoxTwoTone";
import AlternateEmailTwoTone from "@mui/icons-material/AlternateEmailTwoTone";
import CallTwoTone from "@mui/icons-material/CallTwoTone";
import SettingsAccessibilityTwoToneIcon from "@mui/icons-material/SettingsAccessibilityTwoTone";

import { userUtilities } from "src/classes/UserUtilities";

import DialogTemplate from "src/components/dialog/Template";
import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";
import Avatar from "src/components/general/other/Avatar";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";

import { useDispatch, useSelector } from "src/hooks/useThunkReducer";
import { actions } from "src/store/actions";

import { commonActions } from "src/store/commonActions";

const EditProfile = ({ onDialogClose }) => {
  const state = useSelector();
  const dispatch = useDispatch();

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
  }, [state.global.dialogState.editProfile.open, state.user]);

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
        title={<Title />}
        open={state.global.dialogState.editProfile.open}
        content={
          <Content
            profile={state.settings.profile}
            onInputChange={handleInputChange}
            onItemClick={handleItemClick}
          />
        }
        onClose={handleClose}
        actions={<Actions onCancel={handleCancel} />}
      />
    </>
  );
};

const Title = () => <Box.Div>Info</Box.Div>;

const Content = ({ onItemClick, profile }) => {
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const fullNumber = `+${profile.countryCode} ${profile.phoneNumber}`;

  return (
    <>
      <Box.Flex
        gap={1}
        col
        jc="center"
        style={{ maxWidth: "400px" }}
        ai="center"
      >
        <Box.Flex col gap={1} jc="center" ai="center">
          <Avatar style={{ width: "100px", height: "100px" }} />
          <Box.Div style={{ fontWeight: "500", fontSize: 20 }}>
            {fullName}
          </Box.Div>
        </Box.Flex>

        <Box.ListItemButton
          onClick={() => onItemClick({ name: "editBio" })}
          style={{
            alignItems: "center",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 10,
            height: "65px",
          }}
          ai="center"
          jc="space-between"
        >
          <SettingsAccessibilityTwoToneIcon style={{ fontSize: 30 }} />

          <Box.Flex jc="space-between" al="center" style={{ width: "100%" }}>
            <Box.Div>Bio</Box.Div>

            <Box.Div style={{ width: "60%", textAlign: "end" }}>
              <GreyTextParagraph noWrap>
                {profile.bio || "Not Set"}
              </GreyTextParagraph>
            </Box.Div>
          </Box.Flex>
        </Box.ListItemButton>

        {[
          {
            name: "editFullName",
            displayName: "Name",
            value: fullName,
            Icon: AccountBoxTwoTone,
          },
          {
            displayName: "Phone Number",
            disabled: true,
            value: fullNumber,
            Icon: CallTwoTone,
          },
          {
            displayName: "Username",
            name: "editUsername",
            value: profile.username || "Not set",
            Icon: AlternateEmailTwoTone,
          },
        ].map((item, i) => (
          <Box.ListItemButton
            key={i}
            disabled={item.disabled}
            onClick={() => onItemClick(item)}
            style={{
              alignItems: "center",
              borderRadius: "10px",
              display: "flex",
              gap: 10,
              height: "65px",
              width: "100%",
            }}
          >
            <item.Icon style={{ fontSize: 30 }} />
            <Box.Flex style={{ width: "100%" }} jc="space-between">
              <Box.Div>{item.displayName}</Box.Div>
              <Box.Div style={{ color: "#1976d2" }}>{item.value}</Box.Div>
            </Box.Flex>
          </Box.ListItemButton>
        ))}
      </Box.Flex>
    </>
  );
};

const Actions = ({ onCancel }) => (
  <>
    <Input.Button onClick={onCancel} variant="text" color="primary">
      Close
    </Input.Button>
  </>
);

export default EditProfile;
