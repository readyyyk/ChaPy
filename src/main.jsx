import React from 'react';
import ReactDOM from 'react-dom/client';

import {router} from './Router.jsx';
import {RouterProvider} from 'react-router-dom';


window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />,
);
