import AccountBoxIcon from "@mui/icons-material/AccountBoxTwoTone";
import CallIcon from "@mui/icons-material/CallTwoTone";
import ChatIcon from "@mui/icons-material/ChatTwoTone";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotificationsTwoTone";
import LanguageIcon from "@mui/icons-material/LanguageTwoTone";
import LockIcon from "@mui/icons-material/LockTwoTone";
import PieChartIcon from "@mui/icons-material/PieChartTwoTone";

import { Box } from "src/components/general/box";
import { Input } from "src/components/general/input";
import DialogTemplate from "src/components/dialog/Template";

import { useSelector } from "src/hooks/useThunkReducer";

import Avatar from "src/components/general/other/Avatar";
import GreyTextParagraph from "src/components/general/typography/GreyTextParagraph";
import { Divider } from "@mui/material";

const Settings = ({ onDialogClose }) => {
  const state = useSelector();

  const handleCloseContactDialog = () => {
    onDialogClose("settings");
  };

  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  const fullNumber = `+${state.user.countryCode} ${state.user.phoneNumber}`;

  return (
    <DialogTemplate
      title={<Title />}
      content={
        <Content
          fullName={fullName}
          fullNumber={fullNumber}
          username={state.user.username}
        />
      }
      actions={<Actions onClose={handleCloseContactDialog} />}
      open={state.global.dialogState.settings.open}
      paperStyle={{ height: "90vh" }}
      onClose={handleCloseContactDialog}
    />
  );
};

const Title = () => {
  return (
    <>
      <Box.Div>Settings</Box.Div>
    </>
  );
};

const Content = ({ fullName, fullNumber, username }) => {
  return (
    <>
      <ProfileOverview
        fullName={fullName}
        fullNumber={fullNumber}
        username={username}
      />

      <Divider style={{ margin: "20px 0px 20px 0px" }} />

      <SettingsList />
    </>
  );
};

const ProfileOverview = ({ fullName, fullNumber, username }) => {
  return (
    <Box.Flex ai="center" gap={2}>
      <Box.Div>
        <Avatar style={{ width: 80, height: 80 }} />
      </Box.Div>
      <Box.Flex col>
        <Box.Div
          style={{
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          {fullName}
        </Box.Div>
        <Box.Div
          style={{
            fontSize: 16,
            fontWeight: "400",
          }}
        >
          {fullNumber}
        </Box.Div>
        {username && (
          <Box.Div
            style={{
              fontSize: 16,
              fontWeight: "400",
            }}
          >
            <GreyTextParagraph>@{username}</GreyTextParagraph>
          </Box.Div>
        )}
      </Box.Flex>
    </Box.Flex>
  );
};

const SettingsList = () => (
  <Box.List>
    {[
      {
        Icon: AccountBoxIcon,
        name: "Edit Profile",
      },
      { name: "Notifications and Sounds", Icon: CircleNotificationsIcon },
      { name: "Privacy and Security", Icon: LockIcon },
      { name: "Chat Settings", Icon: ChatIcon },
      { name: "Advanced", Icon: PieChartIcon },
      { name: "Call Settings", Icon: CallIcon },
      { name: "Language", Icon: LanguageIcon },
    ].map((item, i) => (
      <Box.ListItemButton
        key={i}
        style={{
          display: "flex",
          height: "65px",
          borderRadius: "10px",
          gap: 1,
        }}
      >
        <Box.Flex gap={1} ai="center">
          <Box.Div>
            <item.Icon style={{ fontSize: 30 }} />
          </Box.Div>
          <Box.Div> {item.name}</Box.Div>
        </Box.Flex>
      </Box.ListItemButton>
    ))}
  </Box.List>
);

const Actions = ({ onClose }) => (
  <>
    <Box.Div>
      <Input.Button
        variant="text"
        style={{ fontWeight: "bold" }}
        onClick={onClose}
      >
        Close
      </Input.Button>
    </Box.Div>
  </>
);

export default Settings;
