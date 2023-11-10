import React from 'react';
import ReactDOM from 'react-dom/client';

import {router} from './Router.jsx';
import {RouterProvider} from 'react-router-dom';

import ReactGA from 'react-ga4';
ReactGA.initialize(import.meta.env.VITE_GA_STREAM);


window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
);
