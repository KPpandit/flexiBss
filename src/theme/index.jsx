import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6c757d",
    },
    secondary: {
      main: "#495057",
    },
    background: {
      default: "#ffffff",
      paper: "#f8f9fa",
    },
    text: {
      primary: "#212529",
      secondary: "#6c757d",
    },
    divider: "#dee2e6",
    action: {
      hover: "#f8f9fa",
      selected: "#e9ecef",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 11,
    h1: { fontSize: "1.5rem", fontWeight: 600 },
    h2: { fontSize: "1.25rem", fontWeight: 600 },
    h3: { fontSize: "1.125rem", fontWeight: 600 },
    h4: { fontSize: "1rem", fontWeight: 600 },
    h5: { fontSize: "0.875rem", fontWeight: 600 },
    h6: { fontSize: "0.8125rem", fontWeight: 600 },
    body1: { fontSize: "0.8125rem" },
    body2: { fontSize: "0.75rem" },
    button: { fontSize: "0.75rem", textTransform: "none" },
    caption: { fontSize: "0.6875rem" },
  },
  spacing: 5,
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "5px 10px",
          minHeight: "28px",
          fontSize: "0.75rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "0.8125rem",
            padding: "6px 10px",
          },
          "& .MuiInputBase-input": {
            padding: "6px 10px",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "6px 10px",
          fontSize: "0.75rem",
        },
        head: {
          fontWeight: 600,
          fontSize: "0.75rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "12px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "22px",
          fontSize: "0.6875rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9e9e9e",
    },
    secondary: {
      main: "#6c757d",
    },
    background: {
      default: "#000000",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#adb5bd",
    },
    divider: "#495057",
    action: {
      hover: "#212529",
      selected: "#343a40",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 11,
    h1: { fontSize: "1.5rem", fontWeight: 600 },
    h2: { fontSize: "1.25rem", fontWeight: 600 },
    h3: { fontSize: "1.125rem", fontWeight: 600 },
    h4: { fontSize: "1rem", fontWeight: 600 },
    h5: { fontSize: "0.875rem", fontWeight: 600 },
    h6: { fontSize: "0.8125rem", fontWeight: 600 },
    body1: { fontSize: "0.8125rem" },
    body2: { fontSize: "0.75rem" },
    button: { fontSize: "0.75rem", textTransform: "none" },
    caption: { fontSize: "0.6875rem" },
  },
  spacing: 5,
  shape: {
    borderRadius: 5,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "5px 10px",
          minHeight: "28px",
          fontSize: "0.75rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            fontSize: "0.8125rem",
            padding: "6px 10px",
          },
          "& .MuiInputBase-input": {
            padding: "6px 10px",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "6px 10px",
          fontSize: "0.75rem",
        },
        head: {
          fontWeight: 600,
          fontSize: "0.75rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "12px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "22px",
          fontSize: "0.6875rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "6px",
        },
      },
    },
  },
})
