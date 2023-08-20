//REFACTOR: Change component name to base
import { TypographyProps } from "@mui/material";

import { Typography } from ".";

const GreyTextParagraph: React.FC<TypographyProps> = (props) => {
  return <Typography.Base {...props} variant="subtitle1" color="GrayText" />;
};

export default GreyTextParagraph;
