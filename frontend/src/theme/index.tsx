import { createTheme, type Theme } from "@mui/material/styles";
import DeepPartial from "@/types/deep-partial";

const theme = ({
  palette,
  typography,
  shape,
  ...props
}: DeepPartial<Theme>) => {
  return createTheme({
    ...(props as any),
    palette: {
      ...palette,
      primary: {
        dark: palette?.primary?.dark,
        main: palette?.primary?.main || "#5850EA",
        light: palette?.primary?.light,
      },
      secondary: {
        dark: palette?.secondary?.dark || "#111828",
        main: palette?.secondary?.main || "#1F2938",
        light: palette?.secondary?.light || "#384152",
      },
      success: {
        main: "#4CAF50",
      },
      info: {
        main: "#2196F3",
      },
    },

    shape: {
      borderRadius: 7,
      ...shape,
    },

    typography: {
      ...typography,
      fontSize: 13,
      fontFamily: "Poppins",
    },

    transitions: {
      ...props.transitions,
      easing: {
        sharp: undefined,
      },
      duration: {
        enteringScreen: 300,
        leavingScreen: 300,
      },
    },
  });
};

export default theme;
