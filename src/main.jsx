import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';


window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
);
