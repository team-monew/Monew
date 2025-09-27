import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import Toast from "./components/Toast";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toast />
    <App />
  </BrowserRouter>
);
