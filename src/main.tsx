import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/routes/App";
import Toast from "./shared/components/Toast";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toast />
    <App />
  </BrowserRouter>
);
