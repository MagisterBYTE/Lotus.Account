import { theme } from "#app";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { LocalizationProvider } from "./provider/localization";
import { AuthProvider } from "./provider/auth";
import { Environment } from "lotus-core/environment";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LocalizationProvider>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            <App />
          </MantineProvider>
        </AuthProvider>
      </LocalizationProvider>
    </React.StrictMode>
  );
}
