import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./redux/store";

import AppRouter from "./routes";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>
  </StrictMode>
);
