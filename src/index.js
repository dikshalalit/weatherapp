import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import OutsideClickProvider from "./base/context/OutsideClick";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <OutsideClickProvider>
    <App />
  </OutsideClickProvider>
);
