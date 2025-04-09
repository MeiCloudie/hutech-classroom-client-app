// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './app/layout/App';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';

dayjs.extend(dayjsPluginUTC);
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    // <App />
    // </React.StrictMode>
    <RouterProvider router={router} />
);
