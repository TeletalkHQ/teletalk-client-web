import { Container as MuiContainer } from "@mui/material";

const Container = ({ mw, maxWidth, ...restOfProps }) => {
  return (
    <MuiContainer {...restOfProps} maxWidth={mw || maxWidth || undefined} />
  );
};

export default Container;
