import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themeConfig";


import { AppRouter } from "./routers/AppRouter";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter/>
      
    </ThemeProvider>
  );
}

export default App;
