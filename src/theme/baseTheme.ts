import { createTheme } from "@mui/material";
import darkScrollbar from "@mui/material/darkScrollbar";

const theme = createTheme();

const baseTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: theme.palette.mode === "dark" ? darkScrollbar() : null,
      },
    },
  },
  palette: {
    // mode: "dark",
  },
});

export { theme, baseTheme };
