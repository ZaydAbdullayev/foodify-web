import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={1800}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>
);
