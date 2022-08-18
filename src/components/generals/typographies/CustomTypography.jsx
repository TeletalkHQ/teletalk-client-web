import { Typography } from "@mui/material";

const CustomTypography = (props) => {
  const { ...restOfProps } = props;

  return <Typography {...restOfProps} />;
};

export default CustomTypography;
