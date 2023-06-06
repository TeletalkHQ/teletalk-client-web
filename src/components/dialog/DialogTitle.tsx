import { DialogTitleProps, DialogTitle as MuiDialogTitle } from "@mui/material";

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
  return <MuiDialogTitle {...props} />;
};

export default DialogTitle;
