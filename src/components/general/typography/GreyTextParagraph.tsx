//REFACTOR: Change component name to base
import { TypographyProps } from "@mui/material";

import Typography from "~/components/general/typography/Typography";

const GreyTextParagraph: React.FC<TypographyProps> = (props) => {
  return <Typography {...props} variant="subtitle1" color="GrayText" />;
};

export default GreyTextParagraph;
