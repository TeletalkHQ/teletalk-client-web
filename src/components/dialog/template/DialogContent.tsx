import {
  DialogContentProps,
  DialogContent as MuiDialogContent,
} from "@mui/material";

const DialogContent: React.FC<DialogContentProps> = (props) => {
  return <MuiDialogContent {...props} />;
};

export default DialogContent;
