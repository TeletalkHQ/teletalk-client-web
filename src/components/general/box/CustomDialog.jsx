import { Dialog } from "@mui/material";

const CustomDialog = ({ zIndex, ...props }) => {
  return (
    <Dialog
      {...props}
      // style={{
      //   zIndex:
      //     props.zIndex ||
      //     //TODO: Read from appConfigs + mui
      //     2000,
      // }}
    />
  );
};

export default CustomDialog;
