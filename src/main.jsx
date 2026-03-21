import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WorkoutContextProvider } from "./context/WorkoutContextProvider.jsx";
import { AuthContextProvider } from "./context/authContextProvider.jsx";
import { FormContextProvider } from "./context/formContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <WorkoutContextProvider>
          <FormContextProvider>
            <App />
          </FormContextProvider>
        </WorkoutContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
