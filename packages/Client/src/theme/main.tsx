import { CssBaseline, Paper } from "@mui/material";
import { green, teal } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

export const AppTheme = ({ children }: { children: ReactNode }) => {
  const theme = createTheme({
    palette: {
      primary: teal,
      secondary: green,
    },
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Paper>{children}</Paper>
      </ThemeProvider>
    </>
  );
};
