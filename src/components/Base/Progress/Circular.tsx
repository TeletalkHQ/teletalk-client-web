import {
  CircularProgressProps,
  CircularProgress as MuiCircularProgress,
} from "@mui/material";

const Circular: React.FC<CircularProgressProps> = ({
  size = 20,
  color = "info",
  ...rest
}) => {
  return <MuiCircularProgress {...rest} size={size} color={color} />;
};

export default Circular;
