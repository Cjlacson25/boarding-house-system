import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";
import Routes from "./routes";

function App() {
  const env = (import.meta as any).env;

  return (
    <ThemeProvider
      theme={theme({
        palette: {
          primary: {
            dark: env.VITE_PRIMARY_COLOR_DARK,
            main: env.VITE_PRIMARY_COLOR_MAIN,
            light: env.VITE_PRIMARY_COLOR_LIGHT,
          },
          secondary: {
            dark: env.VITE_SECONDARY_COLOR_DARK,
            main: env.VITE_SECONDARY_COLOR_MAIN,
            light: env.VITE_SECONDARY_COLOR_LIGHT,
          },
        },
      })}
    >
      <Routes />
    </ThemeProvider>
  );
}

export default App;
