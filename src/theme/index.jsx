import { createTheme } from "@mui/material/styles"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6c757d", // Neutral grey instead of golden yellow
    },
    secondary: {
      main: "#495057", // Darker grey for secondary actions
    },
    background: {
      default: "#ffffff", // Pure white background
      paper: "#f8f9fa", // Light grey for cards
    },
    text: {
      primary: "#212529", // Dark text for contrast
      secondary: "#6c757d", // Grey text
    },
    divider: "#dee2e6", // Light grey borders
    action: {
      hover: "#f8f9fa",
      selected: "#e9ecef",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9e9e9e", // Neutral grey instead of golden yellow
    },
    secondary: {
      main: "#6c757d", // Neutral grey
    },
    background: {
      default: "#000000", // Pure black background
      paper: "#1a1a1a", // Dark grey for cards
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#adb5bd", // Light grey text
    },
    divider: "#495057", // Grey borders
    action: {
      hover: "#212529",
      selected: "#343a40",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})
