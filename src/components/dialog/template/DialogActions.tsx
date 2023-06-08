import {
  DialogActionsProps,
  DialogActions as MuiDialogActions,
} from "@mui/material";

const DialogActions: React.FC<DialogActionsProps> = (props) => {
  return <MuiDialogActions {...props} />;
};

export default DialogActions;
