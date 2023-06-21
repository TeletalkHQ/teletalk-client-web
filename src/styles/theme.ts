// import darkScrollbar from "@mui/material/darkScrollbar";
import { createTheme } from "@mui/material/styles";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#81A1C1", // Nord Polar Night 1
//     },
//     secondary: {
//       main: "#D08770", // Nord Nord 9
//     },
//     background: {
//       default: "#2E3440", // Nord Polar Night 2
//       paper: "#3B4252", // Nord Polar Night 1
//     },
//     text: {
//       primary: "#ECEFF4", // Nord Snow Storm 1
//       secondary: "#D8DEE9", // Nord Snow Storm 2
//     },
//     error: {
//       main: "#BF616A", // Nord Aurora 1
//     },
//   },
// });

// theme = createTheme({
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: theme.palette.mode === "dark" ? darkScrollbar() : null,
//       },
//     },

//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           ":disabled": {
//             backgroundColor: theme.palette.secondary.dark,
//             color: theme.palette.text.disabled,
//           },
//           ":hover": {
//             backgroundColor: theme.palette.success.main,
//             color: theme.palette.text.primary,
//           },
//           backgroundColor: theme.palette.success.main,
//           color: theme.palette.text.primary,
//           fontWeight: 500,
//           padding: "10px",
//         },
//       },
//     },
//     MuiInputAdornment: {
//       styleOverrides: {
//         root: {
//           color: theme.palette.text.primary,
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           color: theme.palette.text.primary,
//           fontSize: 14,
//           padding: "5px",
//         },
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           backgroundColor: theme.palette.background.default,
//           padding: "5px 15px 5px 5px",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "5px",
//         },
//       },
//     },
//     MuiTab: {
//       styleOverrides: {
//         root: {
//           borderRadius: "5px",
//           fontSize: 16,
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiTableHead: {
//       styleOverrides: {
//         root: {
//           borderBottom: "2px solid transparent",
//         },
//       },
//     },
//     MuiTableRow: {
//       styleOverrides: {
//         root: {
//           "&:last-child td, &:last-child th": {
//             border: 0,
//           },
//           "&:not(:last-child)": {
//             borderBottom: `2px solid ${theme.palette.background.default}`,
//           },
//         },
//       },
//     },
//     MuiTabs: {
//       styleOverrides: {
//         root: {
//           "& .MuiTabs-indicator": {
//             background: "unset",
//           },
//           padding: "5px",
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& input": {
//             "-moz-appearance": "textfield",
//           },
//           "& input::-webkit-inner-spin-button": {
//             "-webkit-appearance": "none",
//             margin: 0,
//           },
//           "& input::-webkit-outer-spin-button": {
//             "-webkit-appearance": "none",
//             margin: 0,
//           },
//           borderRadius: "15px",
//         },
//       },
//     },
//   },

//   typography: {
//     // fontFamily: raleway.style.fontFamily,
//     h1: {
//       // fontFamily: cormorant.style.fontFamily,
//     },
//     h2: {
//       // fontFamily: cormorant.style.fontFamily,
//     },
//     h3: {
//       // fontFamily: cormorant.style.fontFamily,
//     },
//     h4: {
//       // fontFamily: cormorant.style.fontFamily,
//     },
//     h5: {
//       // fontFamily: cormorant.style.fontFamily,
//     },
//     h6: {
//       // fontFamily: cormorant.style.fontFamily,
//     },
//   },
// });

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#81A1C1", // Nord Polar Night 1
      dark: "#5E81AC", // Nord Polar Night 2
      light: "#88C0D0", // Nord Snow Storm 4
    },
    secondary: {
      main: "#D08770", // Nord Nord 9
      dark: "#BF616A", // Nord Aurora 1
      light: "#EBCB8B", // Nord Aurora 3
    },
    background: {
      default: "#2E3440", // Nord Polar Night 2
      paper: "#3B4252", // Nord Polar Night 1
    },
    text: {
      primary: "#ECEFF4", // Nord Snow Storm 1
      secondary: "#D8DEE9", // Nord Snow Storm 2
      disabled: "#4C566A", // Nord Frost 3
    },
    error: {
      main: "#BF616A", // Nord Aurora 1
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.9rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.8rem",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 16, textTransform: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 16,
          },
        },
      },
    },
  },
});

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#81A1C1", // Nord Polar Night 1
//       dark: "#5E81AC", // Nord Polar Night 2
//       light: "#88C0D0", // Nord Snow Storm 4
//     },
//     secondary: {
//       main: "#D08770", // Nord Nord 9
//       dark: "#BF616A", // Nord Aurora 1
//       light: "#EBCB8B", // Nord Aurora 3
//     },
//     background: {
//       default: "#ECEFF4", // Nord Snow Storm 1
//       paper: "#FFFFFF", // White
//     },
//     text: {
//       primary: "#2E3440", // Nord Polar Night 2
//       secondary: "#4C566A", // Nord Frost 3
//       disabled: "#B8C2CC", // Nord Frost 4
//     },
//     error: {
//       main: "#BF616A", // Nord Aurora 1
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, sans-serif",
//     h1: {
//       fontSize: "16",
//       fontWeight: 500,
//     },
//     h2: {
//       fontSize: "16",
//       fontWeight: 500,
//     },
//     body1: {
//       fontSize: "16",
//       fontWeight: 400,
//     },
//     body2: {
//       fontSize: "16",
//       fontWeight: 400,
//     },
//     caption: {
//       fontSize: "16",
//       fontWeight: 400,
//     },
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   spacing: 8,
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 16,
//           textTransform: "none",
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//         },
//       },
//     },
//     MuiCardContent: {
//       styleOverrides: {
//         root: {
//           "&:last-child": {
//             paddingBottom: 16,
//           },
//         },
//       },
//     },
//   },
// });

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#FFFFFF", // Purple
//     },
//     secondary: {
//       main: "#FF5722", // Orange
//     },
//     background: {
//       default: "#9C27B0", // Light Gray
//       paper: "#9C27B0", // White
//     },
//     text: {
//       primary: "#333333", // Dark Gray
//       secondary: "#666666", // Medium Gray
//       disabled: "#999999", // Light Gray
//     },
//     error: {
//       main: "#FF1744", // Red
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, sans-serif",
//     h1: {
//       fontSize: "16",
//       fontWeight: 600,
//       letterSpacing: "0.02em",
//     },
//     h2: {
//       fontSize: "16",
//       fontWeight: 500,
//       letterSpacing: "0.01em",
//     },
//     body1: {
//       fontSize: "16",
//       fontWeight: 400,
//       lineHeight: 1.5,
//     },
//     body2: {
//       fontSize: "16",
//       fontWeight: 400,
//       lineHeight: 1.4,
//     },
//     caption: {
//       fontSize: "16",
//       fontWeight: 400,
//       letterSpacing: "0.05em",
//     },
//   },
//   shape: {
//     borderRadius: 12,
//   },
//   spacing: 8,
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 40,
//           textTransform: "none",
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//         },
//       },
//     },
//     MuiCardContent: {
//       styleOverrides: {
//         root: {
//           "&:last-child": {
//             paddingBottom: 16,
//           },
//         },
//       },
//     },
//   },
// });

export default theme;
