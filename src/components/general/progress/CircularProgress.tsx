import {
  CircularProgressProps,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";

const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  return <MuiCircularProgress {...props} />;
};

export default CircularProgress;
