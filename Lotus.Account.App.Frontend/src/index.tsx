import { theme } from '#app';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const rootElement = document.getElementById('root');
if (rootElement)
{
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
          <Notifications/>
          <App />
        </MantineProvider>
    </React.StrictMode>,
  );
}
