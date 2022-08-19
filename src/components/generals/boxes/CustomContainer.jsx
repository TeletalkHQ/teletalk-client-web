import { Container } from "@mui/material";

const CustomContainer = ({ mw, maxWidth, ...restOfProps }) => {
  return <Container {...restOfProps} maxWidth={mw || maxWidth || undefined} />;
};

export default CustomContainer;
