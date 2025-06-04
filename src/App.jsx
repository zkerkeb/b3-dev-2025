import {
  RouterProvider,
} from "react-router";
import router from "./config/router";
import './config/i18n'
import './config/interceptor'
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
