import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DesignSystemProvider, LocalizationProvider } from 'lotus-ui-react/provider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from '#app';
import { AccountServiceClass } from '#modules/account';
import { App } from './App';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { AuthProvider } from './provider/auth';

const rootElement = document.getElementById('root');
if (rootElement) 
{
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LocalizationProvider keySave={AccountServiceClass.LangSaveKey}>
        <DesignSystemProvider keySave={AccountServiceClass.ThemeSaveKey}>
          <AuthProvider>
            <MantineProvider theme={theme}>
              <Notifications />
              <App />
            </MantineProvider>
          </AuthProvider>
        </DesignSystemProvider>
      </LocalizationProvider>
    </React.StrictMode>
  );
}
