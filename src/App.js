import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themeConfig";

import { AppRouter } from "./routers/AppRouter";
import { AuthContext } from "./auth/authContext";
import { authReducer } from "./auth/authReducer";
import { useReducer } from "react";

const init = () => {
  //return JSON.parse(localStorage.getItem("user") || { logged: false });
  return { logged: false };
};

function App() {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ user, dispatch }}>
        <AppRouter />
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
