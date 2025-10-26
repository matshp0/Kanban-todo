import "./App.css";
import { Kanban } from "./components/layout/kanban/Kanban";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";
import { store } from "./store";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Kanban />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
