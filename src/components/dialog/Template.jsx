import { customTypeof } from "custom-typeof";

import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { appConfigs } from "src/classes/AppConfigs";

import CustomDialog from "src/components/general/box/CustomDialog";
import CustomDialogActions from "src/components/general/box/CustomDialogActions";
import CustomDialogContent from "src/components/general/box/CustomDialogContent";
import CustomDialogTitle from "src/components/general/box/CustomDialogTitle";
import { Transitions } from "src/components/other/Transitions";
import { componentBuilder } from "src/classes/ComponentBuilder";

const DialogTemplate = componentBuilder
  .create()
  .registerComponent(
    "DialogTemplate",
    ({
      actionContent,
      mainContent,
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

      const defaultTransitionComponentType =
        appConfigs.getConfigs().ui.defaultDialogTransitionalComponentType;

      const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

      const Transition =
        Transitions[TransitionComponent] ||
        Transitions[defaultTransitionComponentType];

      return (
        <CustomDialog
          fullScreen={fullScreen}
          keepMounted
          {...(customTypeof.isFunction(onClose) && {
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
          <CustomDialogContent>{mainContent}</CustomDialogContent>
          <CustomDialogActions>{actionContent}</CustomDialogActions>
        </CustomDialog>
      );
    }
  )
  .build();

export default DialogTemplate;
