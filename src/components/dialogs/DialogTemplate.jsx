import { customTypeof } from "utility-store/src/classes/CustomTypeof";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { appConfigs } from "classes/AppConfigs";
import { appOptions } from "classes/AppOptions";

import CustomDialog from "components/generals/boxes/CustomDialog";
import CustomDialogActions from "components/generals/boxes/CustomDialogActions";
import CustomDialogContent from "components/generals/boxes/CustomDialogContent";
import CustomDialogTitle from "components/generals/boxes/CustomDialogTitle";

const DialogTemplate = ({
  actionContent,
  dialogContent,
  dialogStyle,
  onClose,
  onKeyDown,
  open,
  paperStyle,
  titleContent,
  TransitionComponent,
  transitionDuration,
}) => {
  const theme = useTheme();
  const { transitions } = appOptions.getOptions().ui;

  const defaultTransitionComponentType =
    appConfigs.getConfigs().ui.defaultDialogTransitionalComponentType;

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const Transition =
    transitions[TransitionComponent] ||
    transitions[defaultTransitionComponentType];

  return (
    <CustomDialog
      fullScreen={fullScreen}
      keepMounted
      {...(customTypeof.check(onClose).type.isFunction && {
        onClose: () => onClose(),
      })}
      // onEscapeKeyDown={onEscapeKeyDown}
      onKeyDown={onKeyDown}
      open={open}
      PaperProps={{
        style: {
          borderRadius: !fullScreen ? "15px" : "",
          minWidth: !fullScreen ? "450px" : "auto",
          ...paperStyle,
          height: !fullScreen ? paperStyle?.height : "100vh",
        },
      }}
      sx={{ ...dialogStyle }}
      TransitionComponent={Transition}
      transitionDuration={transitionDuration || 500}
    >
      <CustomDialogTitle>{titleContent}</CustomDialogTitle>
      <CustomDialogContent>{dialogContent}</CustomDialogContent>
      <CustomDialogActions>{actionContent}</CustomDialogActions>
    </CustomDialog>
  );
};

export default DialogTemplate;
