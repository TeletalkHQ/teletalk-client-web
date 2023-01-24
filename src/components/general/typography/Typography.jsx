import { Typography as MuiTypography } from "@mui/material";

const Typography = (props) => {
  const { ...restOfProps } = props;

  return <MuiTypography {...restOfProps} />;
};

export default Typography;
